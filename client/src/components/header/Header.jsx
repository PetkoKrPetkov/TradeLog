import { Link } from 'react-router-dom'

import '../header/Header.css';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { isAuthenticated, username } = useAuthContext();

    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <h6><Link to="/">TradeLog</Link></h6>
                </div>
                <nav className="main-nav">
                    <Link to="/">Home</Link>
                    <Link to="/trades">Trades</Link>
                    {
                        isAuthenticated
                            ? (
                                <>
                                    <Link to="/logout">Logout</Link>
                                    <Link to="/create-trade">Create Trade</Link>
                                    <Link to="/profile">{username}'s Profile</Link>
                                </>
                            )
                            : (
                                <>

                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                            )
                    }
                </nav>
            </div>
        </header>
    );
}


