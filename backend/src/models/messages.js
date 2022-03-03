const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessagesSchema = new Schema(
  {
    rid: { type: mongoose.Schema.Types.ObjectId, alias: "room_id" },
    uid: { type: mongoose.Schema.Types.ObjectId, alias: "user_id" },
    cmd: { type: Boolean, alias: "command", default: false },
    c: {
      type: String,
      alias: "content",
      required: "This field is required!",
      minlength: 1,
      maxlength: 250,
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

MessagesSchema.virtual("id").get(() => this._id);

module.exports = mongoose.model("Messages", MessagesSchema);
