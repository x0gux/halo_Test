import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp, Firestore } from "firebase/firestore";
import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDz20SSKOJZTyIYaO6fAKcNlo0cbx-bzR4",
  authDomain: "malhalyeon-project.firebaseapp.com",
  databaseURL: "https://malhalyeon-project-default-rtdb.firebaseio.com",
  projectId: "malhalyeon-project",
  storageBucket: "malhalyeon-project.firebasestorage.app",
  messagingSenderId: "733340197258",
  appId: "1:733340197258:web:6c30bb2293f47aecdfa873",
  measurementId: "G-XBDK7WZ9RK",
};

// Initialize Firebase (SSR-safe singleton)
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const firestore: Firestore = getFirestore(app);

let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export interface SaveMatchParams {
  name1: string; // 상대방 이름
  name2: string; // 사용자 이름 (내 이름)
  score?: number;
  userMonster?: string;
  partnerMonster?: string;
  chemiTitle?: string;
}

/**
 * 사용자가 입력한 이름 + 상대방 이름을 Cloud Firestore (`matches` 컬렉션)에 자동 저장
 * (Realtime Database에도 동시에 동기화)
 */
export async function saveMatchToDatabase({
  name1,
  name2,
  score,
  userMonster,
  partnerMonster,
  chemiTitle,
}: SaveMatchParams) {
  const payload = {
    userName: name2, // 사용자 이름 (내 이름)
    partnerName: name1, // 상대방 이름
    name1,
    name2,
    score: score ?? null,
    userMonster: userMonster ?? null,
    partnerMonster: partnerMonster ?? null,
    chemiTitle: chemiTitle ?? null,
    createdAt: new Date().toISOString(),
    timestamp: Date.now(),
  };

  let firestoreDocId: string | null = null;

  // 1. Cloud Firestore에 직접 저장 (matches 컬렉션)
  try {
    const docRef = await addDoc(collection(firestore, "matches"), {
      ...payload,
      serverCreatedAt: serverTimestamp(),
    });
    firestoreDocId = docRef.id;
    console.log("Firestore 저장 완료! Document ID:", docRef.id);
  } catch (firestoreErr) {
    console.error("Firestore 저장 실패:", firestoreErr);
  }

  // 2. Realtime Database에도 백업 동시 저장 (databaseURL 설정 시)
  try {
    if (firebaseConfig.databaseURL) {
      const rtdb = getDatabase(app);
      const matchesRef = ref(rtdb, "matches");
      const newMatchRef = push(matchesRef);
      await set(newMatchRef, payload);
    }
  } catch (rtdbErr) {
    console.warn("Realtime Database 백업 저장 실패:", rtdbErr);
  }

  return {
    success: !!firestoreDocId,
    id: firestoreDocId,
  };
}

export { app, firestore, analytics, firebaseConfig };
