import '../header/Header.css'

export default function Header() {
    return (
        <header className="section site-header">
            <div className="wrapper black-line">
                <img src="./03.Musicfy_Resources/images/logo.jpeg" alt="logo" />
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
    )
}