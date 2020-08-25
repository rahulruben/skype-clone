import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/action';
import PersonIcon from '@material-ui/icons/Person';
import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const [input, setInput] = useState()
    const setCurrentUser = () => {
        input &&  dispatch(actions.setUser(input))
    }

    return (
        <div className="login">
            <div className="login__card">
                <span className="login__logo"></span>
                <div className="input__withIcon">
                    <PersonIcon />
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" className="name" placeholder="enter name" />
                </div>
                <button className="login__btn" onClick={setCurrentUser}>login</button>
                <div className="login__moreBtns">
                    <button className="login__btn">lost name</button>
                    <button className="login__btn">register</button>
                </div>
            </div>
        </div>
    )
}

export default Login
