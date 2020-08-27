import React from 'react'
import './Sidechat.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react'
import db from '../../firebase';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/action';

function Sidechat({ name, id }) {
    const [messages, setMessages] = useState('');
    const dispatch = useDispatch();
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

    const hideSideBar = () => {
        dispatch(actions.setSidebarVisibilitiy(true))
    }

    return (
        <div className="sidechat" onClick={hideSideBar} >
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
