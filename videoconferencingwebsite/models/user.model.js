const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  uid: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

module.exports = model("User", userSchema);
