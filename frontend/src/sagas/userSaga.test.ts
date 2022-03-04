import { userActionTypes } from "actions/userActions";
import assert from "assert";
import { take } from "redux-saga/effects";
import { signInUserSaga } from "./userSaga";

describe("User Saga suite", function () {
    // FIXME: Fix this test, not receiving expected `payload`
    it("# should sign in a user", () => {
        const payload: ISignIn = {
            username: "user_1",
            password: "admin12345"
        }
        const signIn = signInUserSaga({payload} as SignInAction);
        assert.deepEqual(signIn.next().value, take(userActionTypes.SIGNIN_REQUEST), 'it should wait for sign in')
    });
});