import { createContext, useState, useEffect, useContext } from "react";
import { getLoggedInUser } from "../api/service";
import { useNavigate } from "react-router-dom"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await getLoggedInUser();
                if (userData == null) {
                    navigate("/login"); 
                } else {
                    setUser(userData); 
                }
            } catch (error) {
                console.error("Failed to fetch logged in user:", error);
                setUser(null); 
                navigate("/login"); 
            } finally {
                setLoading(false); 
            }
        };

        checkAuth();
    }, [navigate]); 

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
