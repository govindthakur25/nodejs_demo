import mongoose from "mongoose";
async function connectToMongoDB(url) {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(`Error in connection: ${err}`));
}

export { connectToMongoDB };
