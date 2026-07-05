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

// Firebase web config is not a secret in the traditional sense - access is
// governed by Firestore security rules (see firestore.rules), not by hiding
// this key, and since this is a client-only app it still ends up inlined in
// the built JS bundle regardless. It's still pulled from .env (gitignored,
// see .env.example) rather than hardcoded, so the project's config isn't
// sitting in source/git history and can differ per environment.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
