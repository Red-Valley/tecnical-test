const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    cby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      alias: "created_by",
    },
    rn: {
      type: String,
      alias: "room_name",
      minlength: 1,
      maxlength: 15,
    },
    // enrolled users to this room
    users: [
      {
        u_id: { type: mongoose.Schema.Types.ObjectId, alias: "user_id" },
        e_at: {
          type: Date,
          default: Date.now,
          alias: "enrolled_at",
        },
      },
    ]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

RoomSchema.virtual("id").get(() => this._id);

module.exports = mongoose.model("Room", RoomSchema);
