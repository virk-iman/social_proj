import React, { useState, useRef } from 'react';
import { Card, Box, InputBase, IconButton, Button, Typography, Divider } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SendIcon from '@mui/icons-material/Send';
import { createNewPost } from '../../services/api';

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handlePost = async () => {
        if (!content.trim() && !image) return;
        try {
            const formData = new FormData();
            formData.append('content', content);
            if (image) formData.append('image', image);

            const newPost = await createNewPost(formData);
            setContent('');
            setImage(null);
            onPostCreated(newPost);
        } catch (error) {
            console.error('Failed to post', error);
        }
    };

    return (
        <Card elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, backgroundColor: '#fdfdfd', border: '1px solid #eaeaea' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Create Post</Typography>
                <Box sx={{ backgroundColor: '#f0f2f5', borderRadius: 20, p: 0.5, display: 'flex' }}>
                    <Button variant="contained" disableElevation sx={{ borderRadius: 20, textTransform: 'none', height: 28 }}>All Posts</Button>
                    <Button variant="text" sx={{ borderRadius: 20, textTransform: 'none', height: 28, color: 'text.secondary' }}>Promotions</Button>
                </Box>
            </Box>

            <InputBase
                placeholder="What's on your mind?"
                fullWidth
                multiline
                minRows={2}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ mb: 2, fontSize: '1rem', color: '#555' }}
            />

            {image && (
                <Box sx={{ mb: 2, position: 'relative', display: 'inline-block' }}>
                    <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxHeight: 200, borderRadius: 8, objectFit: 'cover' }} />
                    <Button size="small" variant="contained" color="error"
                        sx={{ position: 'absolute', top: 5, right: 5, minWidth: 24, height: 24, borderRadius: '50%', p: 0 }}
                        onClick={() => setImage(null)}
                    >
                        X
                    </Button>
                </Box>
            )}

            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} />
            <Divider sx={{ mb: 1.5 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" gap={1}>
                    <IconButton color="primary" size="small" onClick={() => fileInputRef.current.click()}><CameraAltOutlinedIcon fontSize="small" /></IconButton>
                    <IconButton color="primary" size="small"><EmojiEmotionsOutlinedIcon fontSize="small" /></IconButton>
                    <IconButton color="primary" size="small"><FormatAlignLeftOutlinedIcon fontSize="small" /></IconButton>
                    <Button startIcon={<CampaignOutlinedIcon />} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                        Promote
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    disabled={!content.trim() && !image}
                    onClick={handlePost}
                    endIcon={<SendIcon />}
                    sx={{ borderRadius: 20, textTransform: 'none', px: 3, backgroundColor: (content.trim() || image) ? '#e0e0e0' : 'inherit', color: (content.trim() || image) ? '#000' : 'inherit' }}
                >
                    Post
                </Button>
            </Box>
        </Card>
    );
};

export default CreatePost;
