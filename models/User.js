const {Schema, model} =require('mongoose');




const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
    type: String,
    required: true,
    isUnique: true,
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "please enter a valid email!"
    },
    required: [true, "Email required"]

    },
    thoughts: [
 {
     type: Schema.Types.ObjectId,
     ref: 'Thought'
 }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true 
    },
    
 }
);

// get total length of user friends
UserSchema.virtual('friendCount').get(function() {
return this.friends.length
});

UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total,thought) => total + thought.reactions.length + 1, 0 );
});

// creat user model using userSchema
const User = model('user', UserSchema);

// export the user model
module.exports = User;