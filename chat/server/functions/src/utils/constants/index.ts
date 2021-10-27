import * as admin from "firebase-admin";
import credentialFirebaseConfig from "../../../redvalley-chat-8523685d0c82.json";

export const Collections = {
  Rooms: "rooms",
  Users: "users",
};

export const firebaseConfig = {
  apiKey: "AIzaSyDEiPASI024Q1i8UYjkfYCdScSELwb6ZX8",
  authDomain: "redvalley-chat.firebaseapp.com",
  databaseURL: "https://redvalley-chat.firebaseio.com",
  // databaseURL: "https://redvalley-chat-default-rtdb.firebaseio.com/",
  projectId: "redvalley-chat",
  storageBucket: "redvalley-chat.appspot.com",
  messagingSenderId: "322981387907",
  appId: "1:322981387907:web:671b029ddb7965cd0645b6",
  credential: admin.credential.cert(
    credentialFirebaseConfig as admin.ServiceAccount
  ),
};

export const Enviroments = {
  Producction: "production",
  Development: "development",
};

export const Emulators = {
  AuthEndPoint: "http://localhost:9099",
};
