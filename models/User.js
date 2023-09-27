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
      minLength: 10,
      lowercase: true,
      match: [
        /^[a-z0-9]+([\._-]?[a-z0-9]+)*@([a-z0-9]+[-]?[a-z0-9]+){1}([\.-]?[a-z0-9]+){0,2}([\.]?[a-z]+?){1}([\.]?[a-z]{2})?$/,
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
});

const User = model('user', userSchema);

module.exports = User;
