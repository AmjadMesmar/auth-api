'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');
const multer = require('multer');
const upload = multer();

authRouter.post('/signup', upload.none() ,async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  try {
  const user = await req.body.username;
  res.status(200).send(`Welcome to the secret area, ${user} !`);
  }
  catch (e){
    throw `An error has occured: ${e.message}`;
  }
});


// get user

// read
authRouter.get('/user', bearerAuth, permissions('read'),async (req, res) => {
  try {
  await res.json({ user: req.user });
  }
  catch(e){
    throw `An error has occured: ${e.message}`;
  }
});

// create
authRouter.post('/create', bearerAuth, permissions('create'),async (req, res) => {
  try {
  const user = await req.body.username;
  res.send(`Hey ${user}, You can create something!!`);
  }
  catch(e){
    throw `An error has occured: ${e.message}`;
  }
  
});

// update
authRouter.put('/update', bearerAuth, permissions('update'), async (req, res) => {
  try {
  const user = await req.body.username;
  res.send(`Hey ${user}, You can update something!!`);
  }
  catch(e){
    throw `An error has occured: ${e.message}`;
  }
});

// Patch
authRouter.patch('/patch', bearerAuth, permissions('update'), async (req, res) => {
  try {
  const user = await req.body.username;
  res.send(`Hey ${user}, You can patch something!!`);
  }
  catch(e){
    throw `An error has occured: ${e.message}`;
  }
});


// delete
authRouter.delete('/delete', bearerAuth, permissions('delete'),async (req, res) => {
  try {
  const user = await req.body.username;
  res.send(`Hey ${user}, You can delete something!!`);
  }
  catch(e){
    throw `An error has occured: ${e.message}`;
  }
});


module.exports = authRouter;
