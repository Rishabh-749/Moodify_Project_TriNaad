import { login, register, getMe, logout } from "../services/auth.service";
import { useContext } from "react";
import { AuthContext } from "../auth.context";


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await login(username, email, password);
            setUser(data.user);
        } finally {
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        setLoading(true);

        try {
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);

        try {
            await logout();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout };
};
