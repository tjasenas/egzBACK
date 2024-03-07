const express = require("express");
const { login, register, allUsers, blockUser } = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.post("/api/login", login);
usersRouter.post("/api/register", register);
usersRouter.get("/api/allUsers", allUsers);
usersRouter.put("/api/blockUser", blockUser);

module.exports = {
  usersRouter,
};
