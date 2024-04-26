import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TasksView } from '../views';
import { TaskContextProvider } from "../contexts/TaskContext";

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <TaskContextProvider>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Tasks" component={TasksView} />
            </AppStack.Navigator>
        </TaskContextProvider>
    );
}
