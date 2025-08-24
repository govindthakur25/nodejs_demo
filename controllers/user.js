import User from "../models/user.js";

async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  return res.json(users);
}
async function handleCreateNewUser(req, res) {
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
    return res
      .status(201)
      .json({ message: "A new user is added!", id: result._id });
  }
}
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found!" });
  return res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
  const user = await User.findbyId(user.params.id);
  if (!user) {
    return res.status(404).json({ message: "Provided user doesn't exist" });
  }
  const result = await User.findByIdAndupdate(req.params.id, { lastName: "" });
  return res.status(200).json(user);
}

async function handleDeleteUserById(req, res) {
  const user = await User.deleteById(req.params.id);
  res.status(200).json({ message: "User deleted successfully!" });
}

export {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
};
