const { Schema, model } = require('mongoose');

const dayjs = require('dayjs')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 256
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (v => dayjs(v).format('DD/M/YYY'))

        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

const Thought = model("thought", thoughtSchema);

module.exports = Thought;