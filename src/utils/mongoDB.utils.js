import mongoose from "mongoose";
import envsUtils from "./envs.utils.js";

class MongoSingleton{
  static #instance; 
  static getInstance() {
    if(!MongoSingleton.#instance) {
      mongoose.connect(envsUtils.MONGO_LINK)
      MongoSingleton.#instance = mongoose.connection
      console.log("Conexión a MongoDB establecida")
  } else {
    console.log("Conexión a MondoDB ya esta establecida")
  }
  return MongoSingleton.#instance
}}

export default MongoSingleton;