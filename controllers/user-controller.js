const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req,res) {
      User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },

  // get one user by the id
  getUserById({params}, res) {
      User.findOne({_id: params.id})
      .then(dbUserData => {
          // if no user found 404
          if(!dbUserData) {
              res.status(404).json({message: 'no user found with thatid'});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(404).json(err);
      })
    },

    // creating the  user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update a user by thier ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new:true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no users with that identification!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(404).json(err));
    }



};

module.exports = userController;