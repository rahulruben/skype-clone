import React, { useState, useEffect, useRef } from 'react'
import './Chat.css';
import db from '../../firebase';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function Chat() {
    const [room, setRoom] = useState();
    const { roomId } = useParams();
    const [messages, setMessages] = useState();
    const [input, setInput] = useState('');
    const user = useSelector(state => state.user);
    const [fileUrl, setFileUrl] = useState();
    const inputOpenFileRef = useRef(null);


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoom(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    }, [roomId])
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms')
            .doc(roomId)
            .collection('messages').add({
                name: user,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setInput('');
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
    }

    useEffect(() => {
        if (fileUrl) {
            db.collection('rooms')
                .doc(roomId)
                .collection('messages').add({
                    image: fileUrl,
                    name: user,
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
        }

    }, [fileUrl])

    const onSubmit = (e) => {
        e.preventDefault();
        db.collection('rooms')
            .doc(roomId)
            .collection('messages').add({
                image: fileUrl,
                name: user,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    }
    const showOpenFileDlg = () => {
        inputOpenFileRef.current.click()
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <span className="status"></span>
                <Avatar />
                <div className="person">
                    {room}
                </div>
            </div>
            <div className="chat__body">
                {
                    messages?.length > 0 &&
                    messages.map(message => (
                        <div className={message.name === user ? 'message reciever' : 'message'}>
                            <Avatar />
                            <p>
                                {message.image && (

                                    <img src={message.image} />

                                )}
                                {message.message}
                                <span className="timestamp">
                                    {
                                        new Date(message?.timestamp?.toDate())
                                            .toLocaleTimeString()
                                    }
                                </span>
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="chat__footer">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message here" />
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <input ref={inputOpenFileRef} type="file" onChange={onFileChange} style={{ display: 'none' }} />
                <IconButton onClick={showOpenFileDlg}>
                    <WallpaperIcon />
                </IconButton>
                <IconButton>
                    <MicNoneIcon />
                </IconButton>
                <IconButton>
                    <LocationOnIcon />
                </IconButton>
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
