const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.method('toClient', function () {
  return {
    _id: this._id.toString(),
    email: this.email,
    username: this.username,
    _createdOn: this.createdAt?.getTime?.() || Date.now(),
  };
});

const User = mongoose.model('User', userSchema);
module.exports = User;

