import express from "express";
import { connectToMongoDB } from "./connection.js";
import { userRouter } from "./routes/user.js";
import { logger } from "./middlewares/logger.js";

const app = express();
const PORT = 8000;

await connectToMongoDB("mongodb://127.0.0.1:27017/users");
// Middleware to parse the body
app.use(express.urlencoded({ extended: false }));
app.use(logger("logger.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("Server started!"));
