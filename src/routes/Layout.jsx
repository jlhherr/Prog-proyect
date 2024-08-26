import { Outlet } from "react-router-dom";
import { AuthProvider } from "../components/contexts/AuthContext";
import { ThemeProvider } from "@teishi/bulma_theme";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

export default function Layout() {
    return (
        <AuthProvider>
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                <ThemeProvider>
                <Navbar appName={"Harmonyhub"} />
                    <Outlet />
                    <FooterBar
                        appName={"Harmonyhub"}
                        socialNetworks={[
                            { name: "facebook", url: "https://facebook.com" },
                            { name: "twitter", url: "https://twitter.com" },
                            { name: "instagram", url: "https://instagram.com" },
                        ]}
                        />
                </ThemeProvider>
            </div>
        </AuthProvider>
    );
}