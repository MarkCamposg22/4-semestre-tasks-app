import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { authenticated, loadingLoadStorage } = useContext(AuthContext);

    if (loadingLoadStorage) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }

    return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
