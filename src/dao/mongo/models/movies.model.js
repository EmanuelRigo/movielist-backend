import {model, Schema} from "mongoose";

const nameCollection = "movie";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
    });

const movieModel = model(nameCollection, movieSchema);

export default movieModel;