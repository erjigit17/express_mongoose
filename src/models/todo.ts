import {model, Schema} from 'mongoose'

const todoItem = new Schema({
  message: String,
  completed: Boolean,
  id: Number,
  deletedAt: {type: Date, default: null}
})

export const TodoItemModel = model('TodoItemModel', todoItem)