import React, {useEffect} from "react";
import {useState} from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import useGetUserList from "../Hook/useGetUserList";

import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

import useGetCurrentUserId from "../Hook/useGetCurrentUserId"
import useGetCurrentUserName from "../Hook/useGetCurrentUserName"
import { useNavigation } from '@react-navigation/native';
import ChatRoom from "../../../src/Component/ChatRoom";

const UserList = () =>{
    const [userList, setUserList] = useState([]);
    const getUserList = useGetUserList();
    const buildTopicName = useBuildTopicName();
    const currentUserId = useGetCurrentUserId();
    const currentUserName = useGetCurrentUserName();
    

    const handleMessage = (e) => {
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');
            $alert.parentNode.removeChild($alert);
        }, 2000);

        console.log(JSON.parse(e.data));
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
        console.log();

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://mercure.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;
        
        return () => {
            eventSource.close()
        }

    }, [])

    return (
        <View style={styles.pages}>
            <View style={styles.cards}>
            {userList.map((user) => (
                        <div key={user.id} className='p-2 mb-3  mx-5'>
                            <Link  key={user.id} to={`/conversation/${buildTopicName(user.id)}`}
                                    className='text-white text-decoration-none w-100 d-block '>
                                {user.username}
                            </Link>
                        </div>
                    ))}
            </View>
            <View>
                <ChatRoom/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   
})

export default UserList;
