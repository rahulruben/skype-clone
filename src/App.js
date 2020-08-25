import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
	const user = useSelector(state => state.user);
	return (
		<div className="app">
			<link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"></link>
			<div className="app__body">
				{
					!user ?
						<Login />
						:
						<Router>
							<Sidebar />
							<Switch>
								<Route path="/rooms/:roomId">
									<Chat />
								</Route>
								<Route path="/">
									<div style={{flex: 1}}></div>
								</Route>
							</Switch>
						</Router>
				}
				
			</div>
		</div>
	);
}

export default App;
