import * as admin from "firebase-admin";
import { Predicate } from "../utils/types";
import { BaseModel } from "../models/baseModel";

export interface IBaseRepository<T> {
  get(): Promise<T[]>;
  getById(path: string): Promise<T>;
  create(document: BaseModel<T>): Promise<string>;
  update(path: string, document: BaseModel<T>): Promise<boolean>;
  delete(path: string): Promise<boolean>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  readonly collectionPath: string;
  readonly storeContext: FirebaseFirestore.CollectionReference;

  constructor(collection: string) {
    this.collectionPath = collection;
    this.storeContext = admin.firestore().collection(this.collectionPath);
  }

  abstract mapFields: Predicate<T, FirebaseFirestore.DocumentData>;

  async get(): Promise<T[]> {
    return await this.storeContext.get().then((ref) => {
      return ref.docs.map((item) => {
        return this.mapFields(item.data());
      });
    });
  }

  async getById(path: string): Promise<T> {
    return await this.storeContext
      .doc(path)
      .get()
      .then((ref) => {
        return this.mapFields(ref.data() || {});
      });
  }

  async create(document: BaseModel<T>): Promise<string> {
    return await this.storeContext.add(document.toJSON()).then((ref) => {
      return ref.id;
    });
  }

  async update(path: string, document: BaseModel<T>): Promise<boolean> {
    return await this.storeContext
      .doc(path)
      .update(document.toJSON())
      .then((ref) => {
        return true;
      });
  }

  async delete(path: string): Promise<boolean> {
    return await this.storeContext
      .doc(path)
      .delete()
      .then((ref) => {
        return true;
      });
  }
}
