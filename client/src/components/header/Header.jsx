import { Link } from 'react-router-dom'

import '../header/Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <h6><Link to="/">TradeLog</Link></h6>
                </div>
                <nav className="main-nav">
                        <Link to="/">Home</Link>
                        <Link to="/trades">Trades</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/logout">Logout</Link>
                        <Link to="/create-trade">Create Trade</Link>
                        <Link to="/profile">Profile</Link>                   
                </nav>
            </div>
        </header>
    );
}


