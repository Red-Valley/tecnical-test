import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEiPASI024Q1i8UYjkfYCdScSELwb6ZX8",
  authDomain: "redvalley-chat.firebaseapp.com",
  databaseURL: "https://redvalley-chat-default-rtdb.firebaseio.com/",
  storageBucket: "redvalley-chat.appspot.com",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
if ((window as any).location.hostname === "localhost") {
  connectDatabaseEmulator(db, "localhost", 9000);
}

export default db;
