importScripts(
  'https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js'
);

// import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = firebase.initializeApp({
  apiKey: `${process.env.env.VITE_API_KEY}`,
  authDomain: `${process.env.VITE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.VITE_DATABASE_URL}`,
  projectId: `${process.env.VITE_PROJECT_ID}`,
  storageBucket: `${process.env.VITE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.VITE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.VITE_APP_ID}`,
  measurementId: `${process.env.VITE_MEASUREMENT_ID}`
});

const messaging = firebase.messaging(firebaseConfig);

messaging.onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './pwa_icon_192x192.img'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './pwa_icon_192x192.img'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});