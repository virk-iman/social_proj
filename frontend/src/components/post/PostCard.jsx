import React, { useState } from 'react';
import { Card, Box, Avatar, Typography, Button, IconButton, Chip, Dialog, DialogTitle, DialogContent, Divider, TextField } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import { toggleLike, addComment } from '../../services/api';

const PostCard = ({ post }) => {
    const userInfoStr = localStorage.getItem('userInfo');
    const currentUser = userInfoStr ? JSON.parse(userInfoStr).username : null;

    const [likes, setLikes] = useState(post.likes || []);
    const [comments, setComments] = useState(post.comments || []);
    const [isCommentModalOpen, setCommentModalOpen] = useState(false);
    const [isLikesModalOpen, setLikesModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const isLiked = currentUser ? likes.includes(currentUser) : false;
    const BACKEND_URL = import.meta.env.VITE_API_URL.replace('/api', '') || 'http://localhost:5001';
    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;
        try {
            const data = await addComment(post._id, newComment);
            setComments(data.comments);
            setNewComment("");
        } catch (err) {
            console.error("Comment failed", err);
        }
    };

    const handleLike = async () => {
        if (!currentUser) return alert('Please login to like');

        const originalLikes = [...likes];
        if (isLiked) {
            setLikes(likes.filter(user => user !== currentUser));
        } else {
            setLikes([...likes, currentUser]);
        }

        try {
            const data = await toggleLike(post._id);
            setLikes(data.likes);
        } catch (err) {
            setLikes(originalLikes);
            console.error("Like failed", err);
        }
    };

    return (
        <Card elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3, border: '2px solid #eebb00', backgroundColor: '#fffdf6', position: 'relative', overflow: 'visible' }}>
            <Chip
                label="Suduko : Make Money"
                variant="outlined"
                size="small"
                sx={{ position: 'absolute', top: 16, right: 16, borderColor: '#eebb00', color: '#886600', fontWeight: 'bold' }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box display="flex" gap={1.5}>
                    <Avatar src={post.authorAvatar || ""} alt={post.authorFullName} />
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'inline' }}>
                            {post.authorFullName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>
                            @{post.authorUsername}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ color: '#999' }}>
                            {moment(post.createdAt).format('ddd, D MMM, YYYY, h:mm:ss a')}
                        </Typography>
                    </Box>
                </Box>
                <Button variant="contained" size="small" sx={{ borderRadius: 20, mt: 4, textTransform: 'none', fontWeight: 'bold', backgroundColor: '#007bff' }}>
                    Follow
                </Button>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#886600', mb: 0.5 }}>
                Online Money Earning App For Free
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#333' }}>
                {post.content}
            </Typography>

            {post.image && (
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    {/* 2. Replace localhost with the BACKEND_URL variable */}
                    <img
                        src={`${BACKEND_URL}${post.image}`}
                        alt="Post content"
                        style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain', borderRadius: 8 }}
                    />
                </Box>
            )}

            <Box display="flex" justifyContent="center" mb={3} position="relative">
                <Button variant="contained" sx={{ backgroundColor: '#eebb00', color: '#fff', borderRadius: 20, px: 4, fontWeight: 'bold', '&:hover': { backgroundColor: '#ddaa00' } }}>
                    DOWNLOAD NOW →
                </Button>
                <Chip label="Refer And Earn" size="small" variant="outlined" sx={{ position: 'absolute', right: 0, bottom: -10, borderColor: '#c13584', color: '#c13584', fontSize: '0.65rem' }} />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Box display="flex" alignItems="center" gap={0.5} sx={{ color: 'text.secondary' }}>
                    <IconButton size="small" onClick={handleLike} color={isLiked ? "error" : "default"}>
                        {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>
                    <Typography
                        variant="body2"
                        onClick={() => setLikesModalOpen(true)}
                        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                        {likes.length}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={0.5} sx={{ color: 'text.secondary' }}>
                    <IconButton size="small" onClick={() => setCommentModalOpen(true)}>
                        <ChatBubbleOutlineIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">{comments.length}</Typography>
                </Box>

                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <ShareIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Comment Modal */}
            <Dialog open={isCommentModalOpen} onClose={() => setCommentModalOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle fontWeight="bold">Comments</DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2, color: '#333' }}>
                        {post.content}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
                        {comments.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">No comments yet. Be the first!</Typography>
                        ) : (
                            comments.map((c, i) => (
                                <Box key={i} sx={{ mb: 1.5, p: 1.5, backgroundColor: '#f0f2f5', borderRadius: 2 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary">@{c.username}</Typography>
                                    <Typography variant="body2">{c.text}</Typography>
                                </Box>
                            ))
                        )}
                    </Box>
                    <Box display="flex" gap={1}>
                        <TextField
                            fullWidth size="small" placeholder="Write a comment..."
                            value={newComment} onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                        />
                        <Button variant="contained" disabled={!newComment.trim()} onClick={handleCommentSubmit} sx={{ textTransform: 'none', borderRadius: 2 }}>
                            Post
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Likes Modal */}
            <Dialog open={isLikesModalOpen} onClose={() => setLikesModalOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle fontWeight="bold">Likes</DialogTitle>
                <Divider />
                <DialogContent>
                    <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                        {likes.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">No likes yet.</Typography>
                        ) : (
                            likes.map((username, i) => (
                                <Box key={i} display="flex" alignItems="center" gap={2} sx={{ mb: 1.5, p: 1, borderRadius: 2, '&:hover': { backgroundColor: '#f0f2f5' } }}>
                                    <Avatar sx={{ width: 36, height: 36, backgroundColor: '#eebb00' }}>
                                        {username.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary">@{username}</Typography>
                                </Box>
                            ))
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default PostCard;
