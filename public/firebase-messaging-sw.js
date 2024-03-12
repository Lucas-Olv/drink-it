importScripts(
  'https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js'
);

const firebaseConfig = firebase.initializeApp({
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  databaseURL: "<DATABASE_URL>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>",
  appId: "<APP_ID>",
  measurementId: "<MEASUREMENT_ID>"
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
});
