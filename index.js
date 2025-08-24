import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;
const REQUIRED_FIELDS = [
  "first_name",
  "last_name",
  "email",
  "gender",
  "job_title",
];
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(`Error in connection: ${err}`));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);

// Middleware to parse the body
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
  const html = `
    <ul>
     ${users
       .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
       .join("")}
    </ul>
    `;
  return res.status(200).send(html);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found!" });
  return res.status(200).json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  const user = await User.findbyId(user.params.id);
  if (!user) {
    return res.status(404).json({ message: "Provided user doesn't exist" });
  }
  const result = await User.findByIdAndupdate(req.params.id, { lastName: "" });
  return res.status(200).json(user);
});

app.post("/api/users", async (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({
      message: `One or more required field is missing: ${REQUIRED_FIELDS}`,
    });
  } else {
    // updateDB
    const result = await User.create({
      firstName: first_name,
      lastName: last_name,
      gender: gender,
      email: email,
      jobTitle: job_title,
    });
    return res.status(201).json({ message: "A new user is added!" });
  }
});
app.delete("/api/user/:id", async (req, res) => {
  const user = await User.deleteById(req.params.id);
  res.status(200).json({ message: "User deleted successfully!" });
});
app.listen(PORT, () => console.log("Server started!"));
