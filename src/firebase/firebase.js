import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCG0aki4rfChR2cAjIYX39xfPtSHXl4JME",
    authDomain: "sanjay-achhra.firebaseapp.com",
    projectId: "sanjay-achhra",
    storageBucket: "sanjay-achhra.firebasestorage.app",
    messagingSenderId: "1003086438180",
    appId: "1:1003086438180:web:b50085c725e476a9a1ddb1",
    measurementId: "G-C9CD964DS8"
};

const app = initializeApp(firebaseConfig);

// Analytics throws in some environments (SSR, blocked, unsupported) - never let it break the app
let analytics = null;
try { analytics = getAnalytics(app); } catch { /* ignore */ }

export const db = getFirestore(app);
export { app, analytics };