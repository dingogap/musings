const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9]+([\._-]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-]?[a-zA-Z0-9]+){1}([\.-]?[a-zA-Z0-9]+){0,2}([\.]?[a-zA-Z]+?){1}([\.]?[a-zA-Z]{2})?$/,
                'Invalid Email Address',
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;
