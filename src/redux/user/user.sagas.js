import { takeLatest, put, all, call } from "redux-saga/effects";
import { userActionTypes } from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  const userRef = yield call(
    createUserProfileDocument,
    userAuth,
    additionalData
  );
  const userSnapshot = yield userRef.get();
  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
}

export function* googleSignInAsync() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

export function* signInWithEmailAsync({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (e) {}
}

export function* isUserLogged() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

export function* signOutUser() {
  try {
    auth.signOut();
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e.message));
  }
}

export function* onSignUpStart({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (e) {
    yield put(signUpFailure(e.message));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* checkUserSessionStart() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserLogged);
}

export function* googleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGNIN_START, googleSignInAsync);
}

export function* signInWithEmailStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGNIN_START, signInWithEmailAsync);
}

export function* watchSignOut() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOutUser);
}

export function* watchSignUp() {
  yield takeLatest(userActionTypes.SIGN_UP_START, onSignUpStart);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(signInWithEmailStart),
    call(checkUserSessionStart),
    call(watchSignOut),
    call(watchSignUp),
    call(onSignUpSuccess),
  ]);
}
