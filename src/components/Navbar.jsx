import appLogo from "../assets/logo3.jpg";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useTheme from '../components/hooks/useTheme'

function NavBar({ appName }) {
    const { isAuthenticated } = useAuth("state");
    const { logout } = useAuth("state");
    const navigate = useNavigate();
      const [theme, toggleTheme] = useTheme();


    return (
        <header>
            <nav
                className={"navbar has-background-dark"}
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <div className="columns is-vcentered">
                        <Link className="navbar-item column" to="/">
                            <img
                                src={appLogo}
                                alt="App Logo"
                                className="image is-64x64"
                            />
                        </Link>
                        <p className="column">{appName}</p>
                    </div>
                </div>
                <NavMenu
                    items={[
                        { text: "Home", url: "/" },
                        { text: "Songs", url: "/songs" },
                        { text: "Profile", url: "/profile" },
                        { text: "PlayList", url: "/Play" },
                        { text: "AlbumList", url: "/Album" },
                        { text: "ArtistsList", url: "/Artist" },
                        
                        
                        
                     
                        
                    ]}
                />
                <button
                    className={`button is-small is-primary`}
                    onClick={
                        isAuthenticated
                            ? () => {
                                  logout();
                              }
                            : () => {
                                  navigate("/login");
                              }
                    }
                >
                    {isAuthenticated ? "Cerrar sesión" : "Iniciar Sesión"}
                </button>
            </nav>
        </header>
    );
}

export default NavBar;
