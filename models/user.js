const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  userid: { type: String, required: true },
  todos: { type: Array },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
