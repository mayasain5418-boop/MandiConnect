import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('mandi_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('mandi_token');
        localStorage.removeItem('mandi_user');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('mandi_token');
        if (token) {
            API.get('/auth/profile')
                .then(res => {
                    if (res.data.success) {
                        setUser(res.data.user);
                        localStorage.setItem('mandi_user', JSON.stringify(res.data.user));
                    }
                })
                .catch(() => {
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const sendOtp = async (email) => {
        const res = await API.post('/auth/send-otp', { email });
        return res.data;
    };

    const loginCustomer = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        if (res.data.success && res.data.user) {
            if (res.data.token) localStorage.setItem('mandi_token', res.data.token);
            localStorage.setItem('mandi_user', JSON.stringify(res.data.user));
            setUser(res.data.user);
        }
        return res.data;
    };

    const registerCustomer = async (data) => {
        const res = await API.post('/auth/register', data);
        if (res.data.success && res.data.user) {
            if (res.data.token) localStorage.setItem('mandi_token', res.data.token);
            localStorage.setItem('mandi_user', JSON.stringify(res.data.user));
            setUser(res.data.user);
        }
        return res.data;
    };

    const verifyOtp = async (email, otp) => {
        const res = await API.post('/auth/verify-otp', { email, otp });
        if (res.data.success && res.data.user) {
            if (res.data.token) localStorage.setItem('mandi_token', res.data.token);
            localStorage.setItem('mandi_user', JSON.stringify(res.data.user));
            setUser(res.data.user);
        }
        return res.data;
    };

    const resendOtp = async (email) => {
        const res = await API.post('/auth/resend-otp', { email });
        return res.data;
    };

    const loginAdmin = async (email, password) => {
        const res = await API.post('/auth/admin-login', { email, password });
        if (res.data.success && res.data.user) {
            if (res.data.token) localStorage.setItem('mandi_token', res.data.token);
            localStorage.setItem('mandi_user', JSON.stringify(res.data.user));
            setUser(res.data.user);
        }
        return res.data;
    };

    const updateUserState = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('mandi_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            logout,
            sendOtp,
            loginCustomer,
            registerCustomer,
            verifyOtp,
            resendOtp,
            loginAdmin,
            updateUserState,
            isAuthenticated: !!user,
            isCustomer: user?.role === 'customer' || user?.role === 'buyer' || user?.role === 'seller',
            isAdmin: user?.role === 'admin',
            isSeller: user?.role === 'seller',
            isBuyer: user?.role === 'buyer'
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
