import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSocketState } from '../../../Context/SocketProvider';

const VideoPlayer = () => {
    const { myVideo, userVideo, stream, callAccepted, callEnded, name } = useSocketState();
    useEffect(() => {
        console.log(`[+] Video player mounted`);
    }, []);

    return (
        <Grid container justifyContent="center" spacing={2}>
            {/* YOUR VIDEO */}
            {stream && (
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: '10px', border: '2px solid black' }}>
                        <Typography variant="h5" gutterBottom>
                            My Video: {name}
                        </Typography>
                        <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%' }} />
                    </Paper>
                </Grid>
            )}
            {/* REMOTE VIDEO */}
            {callAccepted && !callEnded && (
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: '10px', border: '2px solid black' }}>
                        <Typography variant="h5" gutterBottom>
                            Remote Video
                        </Typography>
                        <video playsInline muted ref={userVideo} autoPlay style={{ width: '100%' }} />
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
};

export default VideoPlayer;
