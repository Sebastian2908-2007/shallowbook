const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

 const reactionSchema = new Schema({
 reactionId: {
  type: Schema.Types.ObjectId,
  default: () => new Types.ObjectId()
 },
 reactionBody: {
     type: String,
     required: 'you must leave a reaction',
     minlength: 1,
     maxlength: 280
 },
 username: {
     type: String,
     required: true
 },
 createdAt: {
     type: Date,
     default: Date.now,
     get: timestamp => dateFormat(timestamp)
 }

},
{
    toJSON: {
        getters: true
    }
 }
);




const thoughtSchema = new Schema({
    thoughtText: {
     type: String,
     required: 'leave a thought please',
     minlength: 1,
     maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:createdAtValue => dateFormat(createdAtValue)
    },
    username: {
        type: String,
        required: true 
    },
    reactions:  [reactionSchema]
    
},
{
  toJSON: {
      virtuals: true,
      getters: true
  }  
}

);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;