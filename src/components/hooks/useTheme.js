import { useState, useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        } else {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
    });

    useEffect(() => {
       
        document.body.className = theme;
     
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return [theme, toggleTheme];
};

export default useTheme;
