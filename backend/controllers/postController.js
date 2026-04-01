import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        let imagePath = "";

        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        if (!content && !imagePath) {
            return res.status(400).json({ message: 'Post must contain text or an image' });
        }

        const post = await Post.create({
            authorId: req.user._id,
            authorUsername: req.user.username,
            authorFullName: req.user.fullName,
            authorAvatar: req.user.avatar,
            content: content || "",
            image: imagePath,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const username = req.user.username;
        const isLiked = post.likes.includes(username);

        if (isLiked) {
            post.likes = post.likes.filter((user) => user !== username);
        } else {
            post.likes.push(username);
        }

        await post.save();

        res.json({ likes: post.likes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const commentPost = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            username: req.user.username,
            text: text,
            createdAt: Date.now(),
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ comments: post.comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
