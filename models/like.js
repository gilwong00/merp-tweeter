const { model, Schema } = require('mongoose');

const likeSchema = Schema({
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

module.exports = model('Like', likeSchema);
