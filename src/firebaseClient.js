import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { normalizeDirections, toFirestoreDirections } from './domain';

// Firebase web config is not a secret - access is governed by Firestore
// security rules (see firestore.rules), not by hiding this key.
const firebaseConfig = {
  apiKey: 'AIzaSyCYOqJGO0vR0Y41if8DVN_XUi10zkD5TVA',
  authDomain: 'shutter-inspection-app.firebaseapp.com',
  projectId: 'shutter-inspection-app',
  storageBucket: 'shutter-inspection-app.firebasestorage.app',
  messagingSenderId: '573950131133',
  appId: '1:573950131133:web:8b7c5a8df33b80dd4f30d4',
};

const app = initializeApp(firebaseConfig);

// Persistent local cache lets the app keep working offline (common in
// buildings with poor signal); queued writes sync automatically once back
// online, and multi-tab manager avoids cache contention across tabs.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

function floorsCollection(teamCode) {
  return collection(db, 'workspaces', teamCode, 'floors');
}

export function subscribeToFloors(teamCode, onChange) {
  return onSnapshot(floorsCollection(teamCode), (snapshot) => {
    const floors = snapshot.docs.map((d) => {
      const data = d.data();
      return { id: d.id, ...data, directions: normalizeDirections(data.directions ?? {}) };
    });
    floors.sort((a, b) => (a.savedAt?.toMillis?.() ?? a.savedAt ?? 0) - (b.savedAt?.toMillis?.() ?? b.savedAt ?? 0));
    onChange(floors);
  });
}

export async function saveFloorRemote(teamCode, floor) {
  const { id, directions, ...data } = floor;
  await setDoc(doc(floorsCollection(teamCode), id), {
    ...data,
    directions: toFirestoreDirections(directions),
    syncedAt: serverTimestamp(),
  });
}

export async function deleteFloorRemote(teamCode, id) {
  await deleteDoc(doc(floorsCollection(teamCode), id));
}

export async function clearAllFloorsRemote(teamCode) {
  const snapshot = await getDocs(floorsCollection(teamCode));
  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
