import mongoose from "mongoose";

class MongoSingleton{
  static #instance; 
  static getInstance() {
    if(!MongoSingleton.#instance) {
      mongoose.connect('mongodb://127.0.0.1:27017/movies')
      MongoSingleton.#instance = mongoose.connection
      console.log("Conexión a MongoDB establecida")
  } else {
    console.log("Conexión a MondoDB ya esta establecida")
  }
  return MongoSingleton.#instance
}}

export default MongoSingleton;