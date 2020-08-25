import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import DialpadOutlinedIcon from '@material-ui/icons/DialpadOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { IconButton } from '@material-ui/core';
import db from '../../firebase';
import Sidechat from '../sidechat/Sidechat';

function Sidebar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        return () => unsubscribe()
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__icons">
                <div className="skype"></div>
                <div className="interactions">
                    <IconButton>
                        <PermIdentityOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <QueryBuilderOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <DialpadOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <CreateOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                </div>
                <div className="statuses">
                    <span className="statuses__title title--active">Recent</span>
                    <span className="statuses__title">favourites</span>
                    <span className="statuses__title">online</span>
                </div>
            </div>
            <div className="sidebar__people">
                {
                    rooms.map(room => (
                        <Sidechat key={room.id} id={room.id}
                            name={room.data.name}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
