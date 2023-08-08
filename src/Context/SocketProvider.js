import React, { createContext, useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io.connect('http://localhost:8000');

const SocketProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState();
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    console.log(`[+] Get Derived SocketProvider .......`);
    console.log({ stream, me });
    console.log(`[+] ..................................`);
    // socket config
    useEffect(() => {
        getMediaStream();


        const onMeListener = (id) => {
            try {
                setMe(id);
            } catch (error) {
                console.log(`[-] onMeListener Error:`, error);
            }
        };

        const onCallUserListener = ({ userToCall, signalData, from, name: callerName }) => {
            try {
                setCall({ isReceivedCall: true, from /* IS THE CALLER'S SOCKET_ID */, name: callerName, signal: signalData });
            } catch (error) {
                console.log(`[-] onCallUserListener Error:`, error);
            }
        };


        const onConnect = () => {
            console.log(`[+] User connectd ${socket.id}`);
        };

        const onDisconnect = () => {
            console.log(`[+] User disconnected `);
        };

        socket.on('connect', onConnect);
        socket.on('me', onMeListener);
        socket.on('call:User', onCallUserListener);
        socket.on('disconnect', onDisconnect);
        return () => {
            socket.off('connect', onConnect);
            socket.off('me', onMeListener);
            socket.off('disconnect', onDisconnect);
        };
    }, []);


    const onAnswerCall = () => {
        try {
            setCallAccepted(true);
            const peer = new Peer({ initiator: false, trickle: false, stream: stream });

            peer.on('signal', (data) => {
                console.log(`[+] STARTED SIGNALING BY ANSWERING CALL....`);
                socket.emit('answer:Call', { signal: data, to: call.from });
            });

            /*
            This event is triggered when the remote peer's media stream becomes available and can be used for displaying the video and audio from the remote peer
            */
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            });
            /* 
            the peer.signal method handles the incoming signaling data from the other peer and uses it to complete the WebRTC connection setup. This involves exchanging ICE candidates, session descriptions, and other negotiation information that is crucial for establishing a direct peer-to-peer audio/video/data channel between the two peers.
            summary:
            the peer.signal(signal) method is responsible for handling the signaling data exchanged between peers and is a core step in establishing a successful P2P connection using the PeerJS library*/
            peer.signal(call.signal);
            connectionRef.current = peer;

        } catch (error) {
            console.log(`[-] onAnswerCall Error:`, error);
        }
    };


    const callUser = (id) => {
        try {

            /* When a new Peer instance is created, it automatically generates a signal event as part of the WebRTC process. This event is crucial for the peers to exchange the necessary signaling data, including ICE candidates and session description, to establish a direct peer-to-peer connection. */
            const peer = new Peer({ initiator: true, trickle: false, stream: stream });

            peer.on('signal', (data) => {
                console.log(`[+] STARTING SIGNALING BY SENDING A CALL....`);
                socket.emit('call:User', { userToCall: id, signalData: data, from: me, name: name });
            });

            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            });

            socket.on('call:Accepted', (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });
            connectionRef.current = peer;
        } catch (error) {
            console.log(`[-] callUser Error:`, error);
        }
    };

    /* GET THE MEDIA STREAM AND POPULATE THE USER VIDEO*/
    const getMediaStream = async () => {
        try {
            const userstream = navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setStream(userstream);
            myVideo.current.srcObject = userstream;
        } catch (error) {
            console.log(`[-] getMediaStream Error`, error);
        }
    };

    return <SocketContext.Provider value={{ socket }}> {children}</SocketContext.Provider>;
};

const useSocketState = () => {
    return useContext(SocketContext);
};
export { SocketProvider, useSocketState };