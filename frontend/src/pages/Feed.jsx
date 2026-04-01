import React, { useEffect, useState } from 'react';
import { Container, Box, Chip } from '@mui/material';
import CreatePost from '../components/post/CreatePost';
import PostCard from '../components/post/PostCard';
import Navbar from '../components/layout/Navbar';
import { fetchPosts } from '../services/api';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (err) {
                console.error('Failed to fetch posts', err);
            }
        };
        getPosts();
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const filters = ["All Post", "For You", "Most Liked", "Most Commented", "Most Shared"];

    return (
        <Box>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <CreatePost onPostCreated={handlePostCreated} />

                <Box display="flex" justifyContent="center" gap={1} mb={3}>
                    {filters.map((filter, index) => (
                        <Chip
                            key={filter}
                            label={filter}
                            clickable
                            sx={{
                                backgroundColor: index === 0 ? '#007bff' : '#fff',
                                color: index === 0 ? '#fff' : '#555',
                                border: index !== 0 ? '1px solid #ddd' : 'none',
                                fontWeight: index === 0 ? 'bold' : 'normal'
                            }}
                        />
                    ))}
                </Box>

                {posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </Container>
        </Box>
    );
};

export default Feed;
