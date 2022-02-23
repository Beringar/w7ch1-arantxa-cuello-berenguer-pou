const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: { type: Boolean },
  series: [{ type: Schema.Types.ObjectId, ref: "Serie" }],
});

const User = model("User", UserSchema, "users");

module.exports = User;
