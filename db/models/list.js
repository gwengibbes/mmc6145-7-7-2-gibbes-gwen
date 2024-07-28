import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

const ListSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
list: {
    type: String,
    required: true,
  },
  destinationId: {
    type: String,
    required: true,
  },
})

export default models.List || model('List', ListSchema)