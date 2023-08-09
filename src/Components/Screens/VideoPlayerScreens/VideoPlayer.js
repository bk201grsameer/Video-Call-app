import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSocketState } from '../../../Context/SocketProvider';

const VideoPlayer = () => {
    const { myVideo, userVideo, stream, callAccepted, callEnded, name } = useSocketState();
    useEffect(() => {
        console.log(`[+] Video player mounter`);
    }, []);
    return (
        <Grid sx={{ justifyContent: 'center' }}>
            {/* YOUR VIDEO */}
            {stream && <Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant='h5' gutterBottom>My Video : {name}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay style={{ width: '550px' }} />
                </Grid>
            </Paper>
            }
            {/* REMOTE VIDEO */}
            {callAccepted && !callEnded && (
                <Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h5' gutterBottom>Remote Video</Typography>
                        <video playsInline muted ref={userVideo} autoPlay style={{ width: '550px' }} />
                    </Grid>
                </Paper>
            )}
        </Grid>
    );
};

export default VideoPlayer;