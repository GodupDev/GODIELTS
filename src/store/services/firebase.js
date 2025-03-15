import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "godielts.firebaseapp.com",
  databaseURL: "https://godielts-default-rtdb.firebaseio.com",
  projectId: "godielts",
  storageBucket: "godielts.firebasestorage.app",
  messagingSenderId: "684959975666",
  appId: "1:684959975666:web:1e479fd445abf3a1af686b",
  measurementId: "G-HVL6Q6YG6D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.code, error.message);
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    let message = "Login failed";
    switch (error.code) {
      case "auth/invalid-email":
        message = "Invalid email";
        break;
      case "auth/user-not-found":
        message = "User not found";
        break;
      case "auth/wrong-password":
        message = "Incorrect password";
        break;
      case "auth/invalid-credential":
        message = "Invalid credential";
        break;
      default:
        message = error.message;
    }
    throw new Error(message);
  }
};

const getUserData = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

const addData = async (path, data) => {
  try {
    if (Array.isArray(data)) {
      data = { list: data }; // Lưu mảng trong một object
    }
    await setDoc(doc(db, path), data, { merge: true }); // Ghi dữ liệu vào document
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

const updateData = async (path, data) => {
  try {
    // Ensure path has even number of segments
    const segments = path.split("/");
    if (segments.length % 2 !== 0) {
      throw new Error(
        `Invalid document path: ${path}. Path must have even number of segments.`,
      );
    }
    const docRef = doc(db, ...segments);
    await updateDoc(docRef, data);
    console.log("Document updated successfully:", path);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

const getData = async (path) => {
  try {
    // Ensure path has even number of segments
    const segments = path.split("/");
    if (segments.length % 2 !== 0) {
      throw new Error(
        `Invalid document path: ${path}. Path must have even number of segments.`,
      );
    }
    const docRef = doc(db, ...segments);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

export {
  auth,
  googleProvider,
  signInWithPopup,
  signUp,
  signIn,
  getUserData,
  logout,
  updateData,
  getData,
  updateProfile,
  addData,
  db,
};
