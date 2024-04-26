import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Colors } from './config/styles';
import { Routes } from './routes';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <NavigationContainer>
                <AuthContextProvider>
                    <Routes />
                </AuthContextProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 20,
    },
});

export default registerRootComponent(App);
