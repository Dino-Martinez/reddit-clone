const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema for a single post
const PostSchema = new Schema(
  {
    createdAt: { type: Date },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    subreddits: { type: [String], required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model('Post', PostSchema)
