import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

import Login from "../Auth/login";
import Chat from "../Components/Chat";
import List from "../Screens/list";
import UserList from "../../../src/Component/UserList";


const Stack = createNativeStackNavigator();

export default function Route() {
    return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="List" component={UserList}/>
                    <Stack.Screen name="Chat" component={Chat}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}
