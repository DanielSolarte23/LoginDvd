import mongoose from "mongoose";

export const conectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Usuario-login");
    console.log(">>Conectado a Mongo");
  } catch (error) {
    console.log(error);
  }
};
