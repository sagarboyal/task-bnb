import { createContext, useState, useEffect, useContext } from "react";
import { getLoggedInUser } from "../api/service";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const publicPages = ["/login", "/register"];
      const isPublicPage = publicPages.includes(location.pathname);

      try {
        const userData = await getLoggedInUser();

        if (!userData) {
          setUser(null);
          if (!isPublicPage) {
            navigate("/login");
          }
        } else {
          setUser(userData);
          if (isPublicPage) {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Failed to fetch logged in user:", error);
        setUser(null);
        if (!isPublicPage) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
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
