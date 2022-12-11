import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import useGetCurrentUserId from "../Hook/useGetCurrentUserId";
import useGetCurrentUserName from "../Hook/useGetCurrentUserName";
import useGetConversation from "../Hook/useGetConversation";
import {useEffect, useState} from "react";
import Message from "./Message";

export default function ChatRoom() {
    const {topic} = useParams()
    const session = useSelector(store => store.SessionReducer)

    const currentUserId = useGetCurrentUserId();
    const currentUserName = useGetCurrentUserName();
    const getConverssation = useGetConversation();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const stringTopic = topic;
        session.publish(stringTopic,
            [newMessage],
            {
                senderId: currentUserId,
                senderUsername: currentUserName
            }
        );
        setMessages(prevState => [
            {
                content: newMessage,
                user: {
                    id: currentUserId,
                    username: currentUserName
                }
            },
            ...prevState
        ]);
        setNewMessage('');
    }

    useEffect(() => {
        getConverssation(topic).then(data => {
            if (data.chat !== null) {
                setMessages(data.chat.messages);
                console.log(data);
            } else {
                console.log('ce chat est vide');
            }

        });
    }, [])


    return (
        <div className='p-3' style={{height: '100vh', overflow: 'auto', position: 'relative'}}>
            <h1 className='mb-3'>Le Chat room !</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor='message' className='form-label'>Ajoutez un message</label>
                <input type="text" className='w-75 mb-5 d-block form-control' id='message'
                       onChange={handleChange} value={newMessage}/>
            </form>

            {messages.map((message) => {
                if (currentUserId !== message.user.id) {
                    return <Message fromMe={false} content={message.content} username={message.user.username}/>
                } else {
                    return <Message fromMe={true} content={message.content} username={message.user.username}/>
                }
            })}

        </div>
    )
}