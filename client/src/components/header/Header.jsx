import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';

import '../header/Header.css';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { isAuthenticated, username } = useAuthContext();
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

    return (
        <header className="header">
            <a href="#main-content" className="skip-link">Skip to content</a>
            <div className="wrapper">
                <div className="logo">
                    <h6><Link to="/">TradeLog</Link></h6>
                </div>
                <nav className="main-nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
                    <NavLink to="/trades" className={({ isActive }) => isActive ? 'active' : undefined}>Trades</NavLink>
                    {
                        isAuthenticated
                            ? (
                                <>
                                    <NavLink to="/create-trade" className={({ isActive }) => isActive ? 'active' : undefined}>Create Trade</NavLink>
                                    <NavLink to="/logout" className={({ isActive }) => isActive ? 'active' : undefined}>Logout</NavLink>
                                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : undefined}>{username}'s Profile</NavLink>
                                </>
                            )
                            : (
                                <>

                                    <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : undefined}>Login</NavLink>
                                    <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : undefined}>Register</NavLink>
                                </>
                            )
                    }
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </nav>
            </div>
        </header>
    );
}


