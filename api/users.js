const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { createUser, getUserById, getUserByUsername, updateStatus, getStatus } = require('../db');


const requireUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const user = await getUserById(decoded.id);

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({
                error: 'InvalidCredentials',
                message: 'Invalid Token',
                name: 'InvalidCredentialsError'
            })
        };
    } catch (error) {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'You must be logged in to perform this action',
            name: 'UnauthorizedError'
        })
    }
};

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, firstname, lastname, email, children } = req.body;

  if (password.length < 8) {
    console.error("Password must be at least 8 characters in length");

    return res.status(400).json({
      name: "IncorrectPasswordLength",
      message: "Incorrect Password Length",
      error: "IncorrectPasswordLength",
    });
  }

  try {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(409).json({
        name: "UserTaken",
        message: "Username is already taken",
        error: "UsernameTaken",
      });
    }

    const newUser = await createUser({
      username,
      password,
      firstname,
      lastname,
      email,
      children
    });

    if (newUser) {
      const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "24h" });

      res.status(201).json({
        message: "User registered successfully!",
        token: token,
        user: {
          id: newUser.id,
          username: newUser.username,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      res.status(401).json({
        error: "InvalidCredentials",
        message: "Invalid username or password",
        name: "IncorrectLogin",
      });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          error: "InvalidPassword",
          message: "Invalid Password",
          name: "InvalidPassword",
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          SECRET,
          { expiresIn: "24h" }
        );

        res.status(200).json({
          message: `You're logged in!`,
          token: token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error);
    }
});

usersRouter.get('/dashboard', async (req, res, next) => {
  try {
      res.send(req.user);
  } catch (error) {
      next(error);
  }
});

usersRouter.patch('/dashboard/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { currentStatus } = req.body;
  try {
    const response = await updateStatus(currentStatus, userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/dashboard/:userId', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const response = await getStatus(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
})


module.exports = usersRouter;