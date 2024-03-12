import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
  databaseURL: `${import.meta.env.VITE_DATABASE_URL}`,
  projectId: `${import.meta.env.VITE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}`
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const db = getFirestore(app);

export async function requestUserPermissions() {
  console.log('Requesting permission...');
  const permissionResult = await Notification.requestPermission();

  if (permissionResult === "granted") {
    const firebaseToken = await getToken(messaging, {vapidKey: `${import.meta.env.VITE_VAPID_KEY}`})
    if (firebaseToken) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          token: firebaseToken
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log(firebaseToken);
      return firebaseToken;
    }

  } else {
    console.warn("User denied permission for notifications.");
  }

}

