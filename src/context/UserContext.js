import React from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        id: null,
        role: null,
        token: null
    });

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        if (token && userId && role) {
            setUser({ id: userId, role, token });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };