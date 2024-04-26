import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TasksView } from '../views';

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Tasks" component={TasksView} />
        </AppStack.Navigator>
    );
}
