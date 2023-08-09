import React from 'react';
import { useSocketState } from '../../../Context/SocketProvider';
import { Box, Button, Typography } from '@mui/material';

const Notifications = () => {
    const { call, answerCall, callAccepted } = useSocketState();
    return (
        <>
            {call && call.isReceivedCall && !callAccepted && (
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}

                >
                    <Box>
                        <Typography variant='h4'>
                            {call.name} is Calling
                        </Typography>
                    </Box>
                    <Button
                        onClick={(e) => answerCall()}>
                        AnswerCall
                    </Button>

                </Box>
            )}
        </>
    );
};

export default Notifications;