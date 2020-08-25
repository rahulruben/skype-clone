import React from 'react'
import './Sidechat.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react'
import db from '../../firebase';
function Sidechat({ name, id }) {
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc => doc.data()))
                )
        }
    }, [])
    return (
        <div className="sidechat">
            <Link to={`/rooms/${id}`}>
                <div className="chat__person">
                    <span className="status"></span>
                    <Avatar src={`https://avatars.dicebear.com/api/human/34324.svg`} />
                    <div className="person">
                        {name}
                        <div className="person__message">{messages[0]?.message || ( messages[0]?.image && 'Image') }</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Sidechat
