// src/auth/adapters/firebase-auth-adapter.js
// Thin adapter around Firebase Auth so the rest of src/auth can stay provider-agnostic.

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  inMemoryPersistence,
  indexedDBLocalPersistence,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  setPersistence,
  signInAnonymously,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../../infra/firebase.js';

export const auth = getAuth(app);

export const persistenceBackends = Object.freeze({
  indexedDBLocalPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
});

export function onFirebaseAuthStateChanged(callback) {
  return firebaseOnAuthStateChanged(auth, callback);
}

export function setFirebaseAuthPersistence(persistence) {
  return setPersistence(auth, persistence);
}

export function getFirebaseRedirectResult() {
  return getRedirectResult(auth);
}

export function createGoogleAuthProvider() {
  return new GoogleAuthProvider();
}

export function createGoogleCredential(idToken) {
  return GoogleAuthProvider.credential(idToken);
}

export function signInFirebaseAnonymously() {
  return signInAnonymously(auth);
}

export function signInWithGooglePopup(provider) {
  return signInWithPopup(auth, provider);
}

export function signInWithGoogleCredential(credential) {
  return signInWithCredential(auth, credential);
}

export function signOutFirebaseUser() {
  return signOut(auth);
}

export function createPasswordUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function updateFirebaseProfile(user, patch) {
  return updateProfile(user, patch);
}
