const {
   User
} = require("../models");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

async function find(req, res, next) {
   let users = await User.find({}, (err, userInfo) => {
      if (err) return res.status(500).send(err);
      else {
         const userNames = userInfo.map(userName => {
            return {
               "User Name": userName.userName
            }
         })
         res.json(userNames);
      }
   });

   return users;
}

// create new user
async function createUser(req, res, next) {
   try {
      let newUser = new User({
         userName: req.body.userName,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         address: req.body.address,
         whenCreated: Date.now()
      });

      newUser.setPassword(req.body.password);

      let userCheck = await User.find({
         $or: [{
            userName: req.body.userName
         }, {
            email: req.body.email
         }]
      })

      if (userCheck) {
         throw new Error("Email or User ID alreday exists");
      }

      await newUser.save();

      res.status(200).json({
         userName: newUser.userName,
         name: newUser.firstName + " " + newUser.lastName
      });
   } catch (e) {
      res.status(400).send(e);
   }
}

module.exports = {
   find,
   createUser
};