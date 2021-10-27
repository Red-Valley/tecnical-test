export interface IBaseModel<T> {
  toJSON(): any;
  toSaveMap(): T;
}

export abstract class BaseModel<T> implements IBaseModel<T> {
  toJSON(): any {
    const removeEmpty = (obj: any) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
        else if (obj[key] === undefined) delete obj[key];
      });
      return obj;
    };
    return removeEmpty(this.toSaveMap());
  }

  abstract toSaveMap(): T;
}
