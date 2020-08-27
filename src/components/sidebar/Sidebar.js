import React, { useEffect, useState, useRef } from 'react'
import './Sidebar.css';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import DialpadOutlinedIcon from '@material-ui/icons/DialpadOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { IconButton } from '@material-ui/core';
import db from '../../firebase';
import Sidechat from '../sidechat/Sidechat';
import { useSelector } from 'react-redux';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const sideBar = useRef();
    const sideBarHidden = useSelector(state => state.sideBarHidden)

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (sideBarHidden) {
            sideBar.current.classList.add('hide')
        } else {
            sideBar.current.classList.remove('hide')
        }
    }, [sideBarHidden])

    return (
        <div ref={sideBar} className="sidebar">
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
