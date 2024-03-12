import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

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

export async function requestUserPermissions() {
  console.log('Requesting permission...');
  const permissionResult = await Notification.requestPermission();

  if (permissionResult === "granted") {
    const firebaseToken = await getToken(messaging, {vapidKey: `${import.meta.env.VITE_VAPID_KEY}`})

    if (firebaseToken) {
      // Send token to database;
    }
    console.log(firebaseToken);
    return firebaseToken;

  } else {
    console.warn("User denied permission for notifications.");
  }

}

