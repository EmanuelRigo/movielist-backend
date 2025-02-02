import {model, Schema} from "mongoose";

const nameCollection = "users";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    });

const userModel = model(nameCollection, userSchema);

export default userModel;