import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from './ApiProvider';


const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            if (api.isAuthenticated()) {
                const response = await api.get('/me');
                setUser(response.ok ? response.body : null);
            }
            else {
                setUser(null);
            }
        })();
    }, [api])
    
    const login = async (email, password) => {
        const result = await api.login(email, password);
        if (result.ok) {
            const response = await api.get('/me')
            setUser(response.ok ? response.body : null)
        }
        return result;
    }
    
    const logout = async () => {
        await api.logout();
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}