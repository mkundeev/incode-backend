import mongoose from "mongoose";

export default async function dbConnection() {
  if (process.env.MONGO_URI)
    return mongoose.connect(process.env.MONGO_URI, { dbName: "db-incode" });
}
