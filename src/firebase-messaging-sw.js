importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js"
);


const firebaseConfig = {
  apiKey: "AIzaSyA-1Jx06uIyOkSxNIZrNr219iTdFNWd854",
  authDomain: "notification-8d7ad.firebaseapp.com",
  projectId: "notification-8d7ad",
  storageBucket: "notification-8d7ad.appspot.com",
  messagingSenderId: "947256444980",
  appId: "1:947256444980:web:e1992229c5300d77cae261"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});