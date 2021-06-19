const router = require('express').Router();
const {addThought, removeThought,getAllThought,getThoughtById,editThought,addReaction,removeReaction } =require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

// remove thought and add a reaction
router
.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought);

// get all thoughts
router
.route('/')
.get(getAllThought);


// get thought by id and edit a thought
router
.route('/:id')
.get(getThoughtById)
.put(editThought)
module.exports = router;

// delete reaction
router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction)