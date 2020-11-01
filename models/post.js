const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  message: {
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
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Post', postSchema);
