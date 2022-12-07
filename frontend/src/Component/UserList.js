import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import {NavLink} from "react-router-dom";
import useBuildTopicName from "../Hook/useBuildTopicName";

export default function UserList() {
    const [userList, setUserList] = useState([]);
    const getUserList = useGetUserList();
    const buildTopicName = useBuildTopicName();
    

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

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://mercure.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }

    }, [])

    return (
        <div>
            <h1 className='m-5 text-center'>Conversation</h1>
            {userList.map((user) => (
                <div key={user.id} className='p-3 rounded mb-3 bg-dark mx-5'>
                    <NavLink key={user.id} to={`/chat/${buildTopicName(user.id)}`}
                             className='text-white text-decoration-none w-100 d-block text-center'>
                        {user.username}
                    </NavLink>
                </div>
            ))}
        </div>
    )
}