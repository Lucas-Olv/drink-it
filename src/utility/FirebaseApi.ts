import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Messaging, getMessaging, getToken } from "firebase/messaging";
import { getFirestore, Firestore, setDoc, updateDoc, doc } from "firebase/firestore";
import { Auth, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default class FirebaseApi {

  private static firebaseConfig: {};
  private static app: FirebaseApp;
  private static analytics: Analytics;
  private static messaging: Messaging;
  private static vapidKey: {};
  private static db: Firestore;
  private static auth : Auth;
  private static authProvider : GoogleAuthProvider;

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
    FirebaseApi.vapidKey = { vapidKey: `${import.meta.env.VITE_VAPID_KEY}` };

    FirebaseApi.app = initializeApp(FirebaseApi.firebaseConfig);
    FirebaseApi.analytics = getAnalytics(FirebaseApi.app);
    FirebaseApi.messaging = getMessaging(FirebaseApi.app);
    FirebaseApi.db = getFirestore(FirebaseApi.app);
    FirebaseApi.auth = getAuth(FirebaseApi.app);
    FirebaseApi.authProvider = new GoogleAuthProvider();
  }

  async requestUserPermissions() {
    const userUid = localStorage.getItem('userUid') || '';
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || "{}");
    const permissionResult = await Notification.requestPermission();

    if (permissionResult === "granted") {
      const firebaseToken = await getToken(FirebaseApi.messaging, FirebaseApi.vapidKey);

      if (firebaseToken) {
        const docReference = doc(FirebaseApi.db, 'authenticated-users', userUid);
        await updateDoc(docReference, {firebaseMessagingToken: firebaseToken});
      }
    } else {
      console.warn("User denied permission for notifications.");
    }
  }

  logInWithGoogleProvider() {
    signInWithPopup(FirebaseApi.auth, FirebaseApi.authProvider)
  .then(async (result) => {
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const docReference = doc(FirebaseApi.db, 'authenticated-users', user.uid);

    localStorage.setItem('userUid', user.uid);

    await setDoc(docReference, {
      name: user.displayName,
      email: user.email,
      firebaseMessagingToken: "",
      notificationInterval: "",
      dailyIntakeGoal: "",
      accessToken: token
    });

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
}




