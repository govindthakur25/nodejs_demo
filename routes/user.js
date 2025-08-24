import express from "express";
import {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
} from "../controllers/user.js";
const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .patch(handleUpdateUserById)
  .get(handleGetUserById)
  .delete(handleDeleteUserById);

export { router as userRouter };
