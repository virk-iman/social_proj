import React, { useState } from 'react';
import { Box, InputBase, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    // Get logged in user info for the Avatar
    const userInfoStr = localStorage.getItem('userInfo');
    const currentUser = userInfoStr ? JSON.parse(userInfoStr) : null;

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        handleMenuClose();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5, px: 3, mb: 1, backgroundColor: '#fff', borderBottom: '1px solid #eaeaea' }}>

            {/* Logo/Title Space */}
            <Box sx={{ fontWeight: 'bold', fontSize: '1.25rem', mr: 3, minWidth: '60px' }}>
                Social
            </Box>

            {/* Search Bar Container */}
            <Box sx={{
                flexGrow: 1,
                backgroundColor: '#f0f2f5',
                borderRadius: 20,
                px: 2,
                py: 0.5,
                mr: 3,
                display: 'flex',
                alignItems: 'center'
            }}>
                <InputBase
                    placeholder="Search promotions, users, posts..."
                    fullWidth
                    sx={{ ml: 1, color: '#555', fontSize: '0.95rem' }}
                />
            </Box>

            {/* Right Action Icons */}
            <Box display="flex" alignItems="center" gap={2}>
                <IconButton sx={{ backgroundColor: '#007bff', color: '#fff', width: 40, height: 40, '&:hover': { backgroundColor: '#0056b3' } }}>
                    <SearchIcon />
                </IconButton>

                <IconButton sx={{ backgroundColor: '#f0f2f5', color: '#333', width: 40, height: 40 }}>
                    <DarkModeIcon fontSize="small" />
                </IconButton>

                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <Avatar
                        src={currentUser?.avatar || ""}
                        alt={currentUser?.fullName || "User"}
                        sx={{
                            width: 44, height: 44,
                            border: '2px solid transparent',
                            backgroundImage: 'linear-gradient(white, white), linear-gradient(180deg, orange, blue)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box'
                        }}
                    >
                        {currentUser?.fullName?.charAt(0) || "U"}
                    </Avatar>
                </IconButton>
            </Box>

            {/* Logout Dropdown inside Avatar */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{ elevation: 2, sx: { mt: 1.5, minWidth: 120, borderRadius: 2 } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Navbar;
