import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, Firestore, deleteDoc, doc } from "firebase/firestore";
import { LoggedAction } from "./types";

// Firebase Config Interface
export interface FirebaseConfigData {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Key for storage
const STORAGE_KEY = "riau_darling_firebase_config";

// 1. Get configuration from Environment variables OR LocalStorage
export function getStoredFirebaseConfig(): FirebaseConfigData | null {
  // Check Env Vars first
  const envConfig: FirebaseConfigData = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  // Check LocalStorage next (gives users runtime flexibility on Vercel/GitHub Pages)
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as FirebaseConfigData;
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    } catch (e) {
      console.error("Gagal membaca config Firebase dari local storage:", e);
    }
  }

  return null;
}

// 2. Save configuration to local storage
export function saveFirebaseConfig(config: FirebaseConfigData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// 3. Clear configuration
export function clearFirebaseConfig() {
  localStorage.removeItem(STORAGE_KEY);
}

// Dynamic initialization
let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

export function initFirebase(): { app: FirebaseApp; db: Firestore } | null {
  const config = getStoredFirebaseConfig();
  if (!config) return null;

  try {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApp();
    }
    firestoreDb = getFirestore(firebaseApp);
    return { app: firebaseApp, db: firestoreDb };
  } catch (error) {
    console.error("Gagal inisialisasi Firebase SDK:", error);
    return null;
  }
}

// Check if currently connected
export function isFirebaseConnected(): boolean {
  return initFirebase() !== null;
}

// 4. Save action to Firebase Firestore
export async function saveActionToFirestore(action: LoggedAction): Promise<boolean> {
  const connection = initFirebase();
  if (!connection) return false;

  try {
    const { db } = connection;
    await addDoc(collection(db, "actions"), {
      ...action,
      // Ensure date is stored nicely
      serverTimestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Gagal menyimpan ke Firestore:", error);
    return false;
  }
}

// 5. Subscribe to actions stream
export function subscribeToActions(callback: (actions: LoggedAction[]) => void): () => void {
  const connection = initFirebase();
  if (!connection) {
    // Return dummy unsubscribe
    return () => {};
  }

  try {
    const { db } = connection;
    const q = query(collection(db, "actions"), orderBy("date", "desc"));
    
    return onSnapshot(q, (snapshot) => {
      const actions: LoggedAction[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        actions.push({
          id: docSnap.id, // Use firestore document ID
          employeeName: data.employeeName || "Anonim",
          actionId: data.actionId || "",
          actionName: data.actionName || "",
          category: data.category || "other",
          co2Saved: Number(data.co2Saved) || 0,
          plasticSaved: Number(data.plasticSaved) || 0,
          points: Number(data.points) || 0,
          date: data.date || new Date().toISOString(),
          notes: data.notes || "",
        });
      });
      callback(actions);
    }, (error) => {
      console.error("Kesalahan sinkronisasi real-time Firestore:", error);
    });
  } catch (error) {
    console.error("Gagal inisialisasi stream data Firestore:", error);
    return () => {};
  }
}
