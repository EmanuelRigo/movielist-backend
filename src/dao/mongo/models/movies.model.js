import { model, Schema } from "mongoose";

const nameCollection = "movies";

const movieSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
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
    },
    adult: {
        type: Boolean,
        default: false
    },
    backdrop_path: String,
    belongs_to_collection: {
        id: Number,
        name: String,
        poster_path: String,
        backdrop_path: String
    },
    budget: Number,
    genres: [
        {
            id: Number,
            name: String
        }
    ],
    homepage: String,
    imdb_id: String,
    origin_country: [String],
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    production_companies: [
        {
            id: Number,
            logo_path: String,
            name: String,
            origin_country: String
        }
    ],
    production_countries: [
        {
            iso_3166_1: String,
            name: String
        }
    ],
    release_date: Date,
    revenue: Number,
    runtime: Number,
    spoken_languages: [
        {
            english_name: String,
            iso_639_1: String,
            name: String
        }
    ],
    status: String,
    tagline: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    formats: {
        vhs: Boolean,
        dvd: Boolean,
        bluray: Boolean
    },
    checked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const movieModel = model(nameCollection, movieSchema);

export default movieModel;