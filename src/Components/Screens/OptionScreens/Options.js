import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { FaPhoneAlt as FaPhone, FaPhoneSlash } from 'react-icons/fa';
import { BsFillTelephoneXFill } from 'react-icons/bs';
import React, { useState } from 'react';
import { useSocketState } from '../../../Context/SocketProvider';


const Options = ({ children }) => {
    const { me, callAccepted, callEnded, name, setName, leaveCall, callUser } = useSocketState();
    const [idToCall, setIdToCall] = useState('');
    const [notifications, setNotifications] = useState('');
    const handleCall = (e) => {
        try {
            if (!name || !me || !idToCall)
                throw new Error("All Fields Required".toUpperCase());
            console.log({ name, me, idToCall });
            callUser(idToCall);
            return;
        } catch (error) {
            setNotifications(error.message);
        }
    };

    return (
        <Container>
            <Paper elevation={10}>
                <Box
                    display={'flex'}
                    padding={2}

                >
                    <Box
                        marginRight={1}
                        sx={{
                            flex: '1 1 40%'
                        }}
                    >
                        <Typography gutterBottom variant='h6'>Your Name: </Typography>
                        <TextField fullWidth label={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                    </Box>

                    <Box sx={{
                        flex: '1 1 40%'
                    }}>
                        <Typography gutterBottom variant='h6'>ID To Call:</Typography>
                        <TextField fullWidth label={'Id'} value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                        {callAccepted && !callEnded ? (
                            <Button
                                sx={{
                                    backgroundColor: 'red', // Change to your desired color
                                    color: 'white', // Change to your desired text color
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    margin: '5px 0px 0px 0px',
                                    '&:hover': {
                                        // Keep background color consistent on hover
                                    },
                                    // borderRadius: '50%',
                                }}
                                onClick={(e) => leaveCall()}
                            >
                                <BsFillTelephoneXFill size={14}
                                    style={{
                                        color: 'black'
                                    }}
                                />
                            </Button>
                        ) : (
                            <Button
                                sx={{

                                    backgroundColor: '#81c784', // Change to your desired color
                                    color: 'white', // Change to your desired text color
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    margin: '5px 0px 0px 0px'
                                    // borderRadius: '50%',
                                }}
                                onClick={handleCall}
                            >
                                <FaPhone
                                    size={14}
                                    color='black'
                                />
                            </Button>
                        )}
                    </Box>
                </Box>
                {children}
                {notifications &&
                    <Box display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        padding={'10px'}
                    >
                        <Box>
                            {notifications}
                        </Box>
                        <Box
                            onClick={(e) => setNotifications('')}>
                            <Button>X</Button>
                        </Box>
                    </Box>}
            </Paper>
        </Container>
    );
};

export default Options;