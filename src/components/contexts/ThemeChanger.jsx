import useTheme from "../hooks/useTheme";

function ThemeChanger() {
    const [theme, toggleTheme] = useTheme();

    return (
        <div
            className={`section ${
                theme === "light"
                    ? "has-background-light has-text-black"
                    : "has-background-black has-text-light"
            }`}
            style={{ transition: "background-color 0.3s, color 0.3s" }} // Smooth transition effect
        >
            <h2 className="title has-text-centered">Tema Actual: {theme}</h2>
            <div className="buttons is-centered">
                <button
                    className={`button ${
                        theme === "light" ? "is-dark" : "is-light"
                    }`}
                    onClick={toggleTheme}
                >
                    Cambiar Tema
                </button>
            </div>
        </div>
    );
}

export default ThemeChanger;
