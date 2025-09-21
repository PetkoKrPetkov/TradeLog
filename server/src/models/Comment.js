const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    tradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade', required: true },
    content: { type: String, required: true },
    _ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

commentSchema.method('toClient', function () {
  return {
    _id: this._id.toString(),
    tradeId: this.tradeId?.toString?.() || this.tradeId,
    content: this.content,
    _ownerId: this._ownerId?.toString?.() || this._ownerId,
    _createdOn: this.createdAt?.getTime?.() || Date.now(),
  };
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

