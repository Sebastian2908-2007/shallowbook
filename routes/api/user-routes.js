const router = require('express').Router();
const {getAllUser,
       getUserById,
       createUser,
       updateUser,
       deleteUser,
       addFriends,
       deleteFriend


} = require('../../controllers/user-controller')

// set up Get all and post at /api/users
router
.route('/')
.get(getAllUser)
.post(createUser);

//set up get one put or (update) and the delete Route at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:frienId')
.put(addFriends)
.delete(deleteFriend);
module.exports = router;
