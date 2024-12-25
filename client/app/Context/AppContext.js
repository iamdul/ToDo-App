"use client";

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        setToken(savedToken);
    }, []); 

    async function getUser() {
        const res = await fetch("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.ok) {
            setUser(data);
        }
    }

    useEffect(() => {
        if (token) {
        getUser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{token,setToken,user, setUser }}>
          {children}
        </AppContext.Provider>
    );
}