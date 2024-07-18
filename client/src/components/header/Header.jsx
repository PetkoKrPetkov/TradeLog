import '../header/Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <img src="" alt="logo" />
                    <h1>TradeLog</h1>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Catalog</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Register</a></li>
                        <li><a href="#">Logout</a></li>
                        <li><a href="#">Create Trade</a></li>
                        <li><a href="#">Profile</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}


