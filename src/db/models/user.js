// src/db/models/user.js
import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    photo: { type: String },
    gender: {
      type: String,
      enum: ['woman', 'man'],
      default: 'woman',
    },
    dailyWaterRequirement: {
      type: Number,
      required: false,
      default: 1.8,
    },
    weight: { type: Number, required: false, default: 0 },
    activeSportTime: { type: Number, required: false, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.pre('save', function (next) {
  if (!this.name) {
    this.name = this.email.split('@')[0];
  }
  next();
});

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
