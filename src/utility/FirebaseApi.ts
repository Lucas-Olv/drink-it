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
  private static auth: Auth;
  private static authProvider: GoogleAuthProvider;

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

  async logInWithGoogleProvider() {
    const result = await signInWithPopup(FirebaseApi.auth, FirebaseApi.authProvider);
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    localStorage.setItem('userUid', user.uid);
    localStorage.setItem('userDisplayName', user.displayName || "");
    return token;

    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
  }

  async setUserPreferences(docReference: any, deviceToken: string) {
    await setDoc(docReference, {
      firebaseMessagingToken: deviceToken,
    });

    // TODO SET USER PREFERENCES ON DATABASE
    // await setDoc(docReference, {
    //   name: user.displayName,
    //   email: user.email,
    //   //TODO REMOVE PREFERENCES INFO LATER
    //   firebaseMessagingToken: "",
    //   notificationInterval: "",
    //   dailyIntakeGoal: "",
    //   firstTimeOnApp: true,
    //   accessToken: token
    // });
  }

  async requestUserPermissions() {
    const permissionResult = await Notification.requestPermission();
    const docReference = doc(FirebaseApi.db, 'authenticated-users', localStorage.getItem('userUid') || '');

    if (permissionResult === "granted") {
      try {
        const firebaseToken = await getToken(FirebaseApi.messaging, FirebaseApi.vapidKey);
        if (firebaseToken) {
          await this.setUserPreferences(docReference, firebaseToken);
          localStorage.setItem('userPreferences', JSON.stringify({ firebaseMessagingToken: firebaseToken }));

          const createReminder = await fetch(`${import.meta.env.VITE_SCHEDULER_URL}`, {
            method: "POST",
            body: JSON.stringify({
              userUid: localStorage.getItem('userUid')
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })

          if (createReminder.ok) {
            alert('Sucesso!');
          } else {
            alert("Erro ao criar um reminder.");
          }
        }
      } catch (error) {
        alert("Ops! Tente novamente.");
        console.log(error);
      }
    } else {
      console.warn("User denied permission for notifications.");
    }
  }
}




