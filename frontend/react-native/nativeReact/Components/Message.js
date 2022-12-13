import React from "react";
import {View, Image, Text} from "react-native";
import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";

export default function Message({props}) {
    if (!props.fromMe) {
        return (
            <View>
                <Text>{props.username}</Text>
                <Text>{props.content}</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>{props.username}</Text>
                <Text>{props.content}</Text>
            </View>
        )
    }
}
