import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        authorUsername: {
            type: String,
            required: true,
        },
        authorFullName: {
            type: String,
            required: true,
        },
        authorAvatar: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        likes: [
            {
                type: String,
            }
        ],
        comments: [
            {
                username: {
                    type: String,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
    },
    { timestamps: true }
);

export default mongoose.model('Post', postSchema);
