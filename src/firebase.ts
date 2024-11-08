import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import collection and addDoc

const firebaseConfig = {
  apiKey: "AIzaSyCPvi9ew5obJdDQ81uka06uLM7DfsedlME",
  authDomain: "julian-c5bbd.firebaseapp.com",
  projectId: "julian-c5bbd",
  storageBucket: "julian-c5bbd.firebasestorage.app",
  messagingSenderId: "948054349025",
  appId: "1:948054349025:web:51f6f124a7de668ad213a0",
  measurementId: "G-YSMQP2E26H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Example function to add a message to Firestore
const addMessage = async (message: string) => {
  try {
    const docRef = await addDoc(collection(db, "birthdayMessages"), {
      message,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { db, addMessage };
