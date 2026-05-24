import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.service";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      setLoading(true);

      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrapAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
