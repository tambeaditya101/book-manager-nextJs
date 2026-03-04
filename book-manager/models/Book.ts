import mongoose, { Schema, models } from 'mongoose';

const bookSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['want_to_read', 'reading', 'completed'],
      default: 'want_to_read',
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Book = models.Book || mongoose.model('Book', bookSchema);
