 // src/db/models/contact.js

import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', waterSchema);
