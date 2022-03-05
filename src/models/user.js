const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { SALT_ROUNDS } = require("../utils/constants");

const UserSchema = new Schema(
  {
    u: {
      type: String,
      required: "This field is required!",
      alias: "username",
      minlength: 4,
      maxlength: 15,
      unique: true,
    },
    p: {
      type: String,
      required: "This field is required!",
      alias: "password",
      minlength: 8,
    },
    n: {
      type: String,
      alias: "name",
      required: "This field is required!",
      minlength: 1,
      maxlength: 100,
    },
    ph: { type: String, alias: "photo" },
    t: { type: String, alias: "token" },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.pre("save", function (next) {
  if(!this.isNew) {
    const hash = bcrypt.hashSync(this.password, SALT_ROUNDS);
    this.password = hash;
  }
  next();
});

UserSchema.virtual("id").get(() => this._id);

module.exports = mongoose.model("User", UserSchema);
