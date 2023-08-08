import { AppBar, Typography } from '@mui/material';
import React from 'react';
import VideoPlayer from '../VideoPlayerScreens/VideoPlayer';
import Options from '../OptionScreens/Options';
import Notifications from '../NotificationScreens/Notifications';

const MyAppBar = () => {
    return (
        <>
            <div>
                <AppBar position='static' color='inherit'
                    sx={{
                        borderRadius: 5,
                        margin: '30px 100px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '600px',
                        border: '2px solid black',
                    }}>
                    <Typography variant='h3' align='center'>Video Chat</Typography>
                </AppBar>
            </div>
            <div>
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
            </div>
        </>
    );
};

export default MyAppBar;