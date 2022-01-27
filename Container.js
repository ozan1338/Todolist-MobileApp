import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack'

import ToDoList from "./src/screens/ToDoList";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register"

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTab() {
    return (
        <Tab.Navigator
            initialRoute="ToDoList"
            screenOptions={({route})=>({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if(route.name === 'ToDoList'){
                        iconName = focused ? "ios-list" : "ios-list-outline"
                    } else if(route.name === 'Profile'){
                        iconName = focused ? "ios-person" : "ios-person-outline"
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray'
            })}
        >
            <Tab.Screen name="ToDoList"  component={ToDoList} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default function Container () {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureDirection: "vertical"
                }}
            >
                <Stack.Screen 
                    name="Login"
                    component={Login}
                />
                <Stack.Screen 
                    name="Register"
                    component={Register}
                />
                <Stack.Screen 
                    name="ToDoList-Screen"
                    component={MyTab}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}