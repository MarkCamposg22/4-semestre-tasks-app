import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { env } from '../config/env';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [loadingLoadStorage, setLoadingLoadStorage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function loadStorageData() {
            const data = await AsyncStorage.getItem(env.storageKey);
            if (data) {
                setToken(data);
            }
            setLoadingLoadStorage(false);
        }

        loadStorageData();
    });

    const register = async ({ email, password, passwordConfirmation }) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${env.apiUrl}/api/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        passwordConfirmation
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            await AsyncStorage.setItem(env.storageKey, JSON.stringify(data.accessToken));
            setToken(data.accessToken);
        } catch (error) {
            console.error(error);
            setError('Erro interno.')
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${env.apiUrl}/api/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            await AsyncStorage.setItem(env.storageKey, JSON.stringify(data.accessToken));
            setToken(data.accessToken);
        } catch (error) {
            console.error(error);
            setError('Erro interno.')
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(env.storageKey);
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                error,
                setError,
                loadingLoadStorage,
                loading,
                token,
                authenticated: !!token,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
