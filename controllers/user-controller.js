const { User } = require('../models');

const userController = {
  // get all users
  getAllUser(req,res) {
      User.find({})
      .populate({
          path: 'thoughts',
          select:'-__v'
      })
      .select('-__v')
      .sort({_id: -1})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },

  // get one user by the id
  getUserById({params}, res) {
      User.findOne({_id: params.id})
      .populate({
          path: 'thoughts',
          select: '-__v' 
      })
      .select('-__v')
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
    },


    addFriends( req, res) {
         
//req.
  console.log(req.params)
          
        User.findOneAndUpdate(
            //params
            {_id: req.params.userId},
            //params.
            {$addToSet:  {friends: req.params.frienId } },
            {new: true}
        )
    
  
    
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'})
                return;
            }
            res.json(dbUserData)
            
        })
        
        .catch(err => res.json(err));
    },


   deleteFriend( req, res) {
       User.findOneAndUpdate(
           {_id: req.params.userId},
           {$pull: {friends:req.params.frienId}}
       )
       .then(dbUserData => {
           if(!dbUserData) {
               res.status(404).json({message: 'no friends with that Id'});
           }
           res.json(dbUserData)
       })
       .catch(err => res.status(404).json(err))
   }



};

module.exports = userController;  /**60cc4aa68117a0525cac834f */