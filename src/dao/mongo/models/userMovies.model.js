import mongoose, { model, Schema } from "mongoose";

const nameCollection = "userMovies";

const userMoviesSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    movies: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movies",
          required: true,
        },
        checked: {
          type: Boolean,
          required: true,
        },
        formats: {
          vhs: Boolean,
          dvd: Boolean,
          bluray: Boolean,
        },
      },
    ],
  },
  { timestamps: true }
);

const userMoviesModel = model(nameCollection, userMoviesSchema);

export default userMoviesModel;
