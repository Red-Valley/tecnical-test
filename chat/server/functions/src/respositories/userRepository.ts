import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { ISignUpUser, SignUpUserModel } from "../models/user/signUpUser";
import { Collections } from "../utils/constants";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository<ISignUpUser> {
  constructor() {
    super(Collections.Users);
  }

  mapFields = (document: FirebaseFirestore.DocumentData) => {
    return document as ISignUpUser;
  };

  async signup(document: SignUpUserModel): Promise<string> {
    let token: string;
    return await createUserWithEmailAndPassword(
      getAuth(),
      document.email,
      document.password
    )
      .then((userCredential) => {
        document.userId = userCredential.user.uid;
        return userCredential.user.getIdToken();
      })
      .then((result) => {
        token = result;
        return this.create(document);
      })
      .then(() => {
        return token;
      });
  }

  async getByUserId(userId: string): Promise<ISignUpUser> {
    return await new UserRepository().storeContext
      .where("userId", "==", userId)
      .limit(1)
      .get()
      .then((ref) => {
        return this.mapFields(ref.docs[0].data() || {});
      });
  }
}
