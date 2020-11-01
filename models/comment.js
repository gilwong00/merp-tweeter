const { model, Schema } = require('mongoose');

const commentSchema = Schema({
  content: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString()
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = model('Comment', commentSchema);
