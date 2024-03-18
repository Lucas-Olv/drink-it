import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Messaging, getMessaging, getToken } from "firebase/messaging";
import { getFirestore, addDoc, collection, Firestore } from "firebase/firestore";

export default class FirebaseApi {

  private static firebaseConfig: {};
  private static app: FirebaseApp;
  private static analytics: Analytics;
  private static messaging: Messaging;
  private static vapidKey: {};
  private static db: Firestore;

  init() {

    FirebaseApi.firebaseConfig = {
      apiKey: `${import.meta.env.VITE_API_KEY}`,
      authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
      databaseURL: `${import.meta.env.VITE_DATABASE_URL}`,
      projectId: `${import.meta.env.VITE_PROJECT_ID}`,
      storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
      messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
      appId: `${import.meta.env.VITE_APP_ID}`,
      measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}`
    };
    FirebaseApi.vapidKey = {vapidKey: `${import.meta.env.VITE_VAPID_KEY}`};

    FirebaseApi.app = initializeApp(FirebaseApi.firebaseConfig);
    FirebaseApi.analytics = getAnalytics(FirebaseApi.app);
    FirebaseApi.messaging = getMessaging(FirebaseApi.app);
    FirebaseApi.db = getFirestore(FirebaseApi.app);
  }
  
  async requestUserPermissions() {
    const permissionResult = await Notification.requestPermission();
  
    if (permissionResult === "granted") {
      const firebaseToken = await getToken(FirebaseApi.messaging, FirebaseApi.vapidKey);
      if (firebaseToken) {
        return firebaseToken;
      }
    } else {
      console.warn("User denied permission for notifications.");
    }
  
  }
}




