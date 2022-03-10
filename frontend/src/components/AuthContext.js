import { createContext, useState } from "react";

const AuthContext = createContext({});
function getAuth() {
    const authSession = sessionStorage.getItem('auth')
    const authJson = JSON.parse(authSession)
    return authJson
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuth());

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;