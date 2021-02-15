const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require('../util/autopopulate')

const CommentSchema = new Schema(
  {
    createdAt: { type: Date },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: { createdAt: 'created_at' } }
)
CommentSchema.pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comments'))
  .pre('find', Populate('comments'))
module.exports = mongoose.model('Comment', CommentSchema)
