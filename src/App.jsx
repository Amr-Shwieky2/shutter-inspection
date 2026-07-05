import { useEffect, useMemo, useState } from 'react';
import TopBar from './components/TopBar';
import InspectView from './components/InspectView';
import SummaryView from './components/SummaryView';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import PrintReport from './components/PrintReport';
import TeamGate from './components/TeamGate';
import { DIR_ORDER } from './constants';
import { makeEmptyDirections, cloneDirections, isFloorComplete, toggleWindowStatus } from './domain';
import { loadPersisted, savePersisted } from './utils/storage';
import { genId } from './utils/id';
import { subscribeToFloors, saveFloorRemote, deleteFloorRemote, clearAllFloorsRemote } from './firebaseClient';

export default function App() {
  const initial = useMemo(() => loadPersisted(), []);

  const [teamCode, setTeamCode] = useState(initial?.teamCode ?? null);
  const [floorsLoaded, setFloorsLoaded] = useState(false);
  const [tab, setTab] = useState('inspect');
  const [site, setSite] = useState(initial?.site ?? '');
  const [inspector, setInspector] = useState(initial?.inspector ?? '');
  const [floors, setFloors] = useState([]);
  const [floorInput, setFloorInput] = useState('');
  const [sel, setSel] = useState(() => makeEmptyDirections());
  const [editingId, setEditingId] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    savePersisted({ teamCode, site, inspector });
  }, [teamCode, site, inspector]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!teamCode) return undefined;
    setFloorsLoaded(false);
    const unsubscribe = subscribeToFloors(teamCode, (remoteFloors) => {
      setFloors(remoteFloors);
      setFloorsLoaded(true);
    });
    return unsubscribe;
  }, [teamCode]);

  function stepFloor(delta) {
    setFloorInput((prev) => {
      const n = parseInt(prev, 10);
      if (Number.isFinite(n)) return String(n + delta);
      return delta > 0 ? '1' : prev;
    });
  }

  function handleCountChange(dirId, newCount) {
    setSel((prev) => {
      const cur = prev[dirId];
      const windows = cur.windows.slice(0, newCount);
      while (windows.length < newCount) windows.push([]);
      return { ...prev, [dirId]: { count: newCount, windows } };
    });
  }

  function handleToggleStatus(dirId, index, statusId) {
    setSel((prev) => {
      const cur = prev[dirId];
      const windows = cur.windows.slice();
      windows[index] = toggleWindowStatus(windows[index], statusId);
      return { ...prev, [dirId]: { ...cur, windows } };
    });
  }

  const canSave = floorInput.trim().length > 0 && isFloorComplete(sel);

  function handleSaveFloor() {
    if (!canSave) {
      setToast(!floorInput.trim() ? 'נא להזין מספר קומה' : 'יש לבחור סטטוס לכל חלון שהוגדר');
      return;
    }
    const label = floorInput.trim();
    const existing = editingId ? floors.find((f) => f.id === editingId) : null;
    const floorDoc = {
      id: editingId ?? genId(),
      floorLabel: label,
      directions: cloneDirections(sel),
      site: site.trim(),
      inspector: inspector.trim(),
      savedAt: existing?.savedAt ?? Date.now(),
      ...(existing ? { updatedAt: Date.now() } : {}),
    };
    // Firestore's offline cache applies this write locally right away and
    // syncs in the background - don't block the UI on the network round-trip,
    // or a worker with no signal gets no feedback and the form never advances.
    saveFloorRemote(teamCode, floorDoc).catch(() => {
      setToast('הסנכרון נכשל - הנתונים נשמרו במכשיר ויסונכרנו כשהחיבור יחזור');
    });
    setToast(editingId ? `קומה ${label} עודכנה בהצלחה` : `קומה ${label} נשמרה בהצלחה`);
    const carryCounts = Object.fromEntries(DIR_ORDER.map((d) => [d, sel[d].count]));
    const wasNumeric = /^\d+$/.test(label);
    setEditingId(null);
    setSel(makeEmptyDirections(carryCounts));
    setFloorInput(wasNumeric ? String(parseInt(label, 10) + 1) : '');
  }

  function handleEditFloor(id) {
    const f = floors.find((x) => x.id === id);
    if (!f) return;
    setEditingId(id);
    setFloorInput(f.floorLabel);
    setSel(cloneDirections(f.directions));
    setTab('inspect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setSel(makeEmptyDirections());
  }

  function handleDeleteFloor(id) {
    const f = floors.find((x) => x.id === id);
    if (!f) return;
    setConfirmState({
      message: `למחוק את קומה ${f.floorLabel}? לא ניתן לשחזר פעולה זו.`,
      onYes: () => {
        deleteFloorRemote(teamCode, id).catch(() => {
          setToast('המחיקה תסונכרן כשהחיבור יחזור');
        });
        if (editingId === id) {
          setEditingId(null);
          setSel(makeEmptyDirections());
        }
        setConfirmState(null);
        setToast('הקומה נמחקה');
      },
    });
  }

  function handleClearAll() {
    if (!floors.length) {
      setToast('אין נתונים למחיקה');
      return;
    }
    setConfirmState({
      message: `למחוק את כל הקומות שנשמרו (${floors.length})? פעולה זו אינה הפיכה ומשפיעה על כל הצוות.`,
      onYes: () => {
        clearAllFloorsRemote(teamCode).catch(() => {
          setToast('המחיקה תסונכרן כשהחיבור יחזור');
        });
        setEditingId(null);
        setSel(makeEmptyDirections());
        setConfirmState(null);
        setToast('כל הנתונים נמחקו');
      },
    });
  }

  async function handleExportExcel() {
    if (!floors.length) {
      setToast('אין נתונים לייצוא — יש לשמור לפחות קומה אחת');
      return;
    }
    setToast('מכין קובץ אקסל...');
    const { exportExcel } = await import('./export/excel');
    await exportExcel(floors, site);
    setToast('קובץ האקסל הורד בהצלחה');
  }

  function handleExportPrint() {
    if (!floors.length) {
      setToast('אין נתונים להפקת דוח — יש לשמור לפחות קומה אחת');
      return;
    }
    window.print();
  }

  function handleSwitchTeam() {
    setConfirmState({
      message: 'להתנתק מקוד הצוות הנוכחי ולעבור לקוד אחר?',
      onYes: () => {
        setTeamCode(null);
        setFloors([]);
        setFloorsLoaded(false);
        setEditingId(null);
        setSel(makeEmptyDirections());
        setConfirmState(null);
      },
    });
  }

  if (!teamCode) {
    return <TeamGate onSubmit={setTeamCode} />;
  }

  return (
    <>
      <Toast message={toast} />
      <TopBar tab={tab} onTabChange={setTab} floorsCount={floors.length} teamCode={teamCode} onSwitchTeam={handleSwitchTeam} />
      <main className={`content${tab === 'inspect' ? ' has-savebar' : ''}`}>
        {!floorsLoaded ? (
          <p className="loading-hint">טוען נתונים משותפים...</p>
        ) : tab === 'inspect' ? (
          <InspectView
            site={site}
            onSiteChange={setSite}
            inspector={inspector}
            onInspectorChange={setInspector}
            floorInput={floorInput}
            onFloorInputChange={setFloorInput}
            onStepFloor={stepFloor}
            sel={sel}
            onCountChange={handleCountChange}
            onToggleStatus={handleToggleStatus}
            editingId={editingId}
            onCancelEdit={handleCancelEdit}
            canSave={canSave}
            onSave={handleSaveFloor}
            floors={floors}
            onEditFloor={handleEditFloor}
            onDeleteFloor={handleDeleteFloor}
          />
        ) : (
          <SummaryView
            floors={floors}
            onExportExcel={handleExportExcel}
            onExportPrint={handleExportPrint}
            onEditFloor={handleEditFloor}
            onDeleteFloor={handleDeleteFloor}
            onClearAll={handleClearAll}
          />
        )}
      </main>
      <ConfirmModal message={confirmState?.message} onConfirm={confirmState?.onYes} onCancel={() => setConfirmState(null)} />
      <PrintReport floors={floors} site={site} inspector={inspector} />
    </>
  );
}
