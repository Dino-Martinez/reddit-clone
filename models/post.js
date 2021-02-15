const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require('../util/autopopulate')

// Schema for a single post
const PostSchema = new Schema(
  {
    createdAt: { type: Date },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    subreddits: { type: [String], required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: { createdAt: 'created_at' } }
)

// Always populate the author field
PostSchema.pre('findOne', Populate('author')).pre('find', Populate('author'))

module.exports = mongoose.model('Post', PostSchema)
