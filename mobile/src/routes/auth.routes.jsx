import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginView, RegisterView } from '../views';

const AuthStack = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginView} />
            <AuthStack.Screen name="Register" component={RegisterView} />
        </AuthStack.Navigator>
    );
}
