import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

import { auth } from "./firebase-auth";

const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

const googleSignIn = async () => {
  return signInWithPopup(auth, googleProvider);
};

const setProfile = (name, image) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: image,
  });
};

const update_Profile = (name, image, number) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: image
  });
};

export {
  createUser,
  loginUser,
  logoutUser,
  setProfile,
  googleSignIn,
  update_Profile,
};
