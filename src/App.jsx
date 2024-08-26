import React, { useState } from "react";

import ThemeChanger from "./components/ThemeChanger";

import FooterBar from "./components/Footerbar";

import useTheme from "./hooks/useTheme";

import ThemeContext from "./contexts/ThemeContext";

import NavBar from "./components/NavBar";

function App() {
    const [theme, toggleTheme] = useTheme();

    return (
        <div className="hero is-fullheight is-flex is-flex-direction-column">
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <NavBar appName={"React Examples"} />
                <div className="container">
                    <ThemeChanger />
                   
                </div>
                <FooterBar />
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
