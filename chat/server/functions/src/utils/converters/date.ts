import * as admin from "firebase-admin";

export class Time {
  static TimestampToDate(
    timestamp: admin.firestore.Timestamp | any
  ): Date | any {
    return timestamp instanceof admin.firestore.Timestamp
      ? new admin.firestore.Timestamp(
          timestamp.seconds,
          timestamp.nanoseconds
        ).toDate()
      : timestamp
      ? new Date(timestamp)
      : undefined;
  }

  static DateToTimestamp(date: Date | any): admin.firestore.Timestamp | any {
    return date instanceof Date
      ? admin.firestore.Timestamp.fromDate(date)
      : undefined;
  }
}
