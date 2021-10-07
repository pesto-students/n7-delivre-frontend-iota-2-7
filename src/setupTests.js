// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebase = {initializeApp, getAuth}

const initialize = () => {
    return { currentUser: { uid: null } };
}
const auth = () => {
    return { currentUser: { uid: null } };
}
jest.spyOn(firebase, "initializeApp").mockImplementation(initialize);
jest.spyOn(firebase, "getAuth").mockImplementation(auth);