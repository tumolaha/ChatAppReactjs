import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

//component
import * as services from '~/services/messageService';
//ui
import NewMessageForm from './ChatForm/NewMessageForm';
import { useSelector } from 'react-redux';
import ChatContainer from './ChatContainer/ChatContainer';

import { io } from 'socket.io-client';
import HeaderChat from './HeaderChat/HeaderChat';
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);
const socket = io('http://localhost:5000');

function Chat() {
    const currentChatSelect = useSelector((state) => state.contact.currentContact);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    //typing chat
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        socket.on('message-receiver', (value) => {
            setArrivalMessage({
                sender: value.sender,
                user: [value.sender._id, value.receiverId],
                message: value.message,
                createAt: value.createAt,
            });
        });
    }, []);

    useEffect(() => {
        socket.emit('add-user', currentUser._id);
    }, [currentUser]);

    // fetch message user
    useEffect(() => {
        const fetchApi = async () => {
            if (currentChatSelect.currentChat && currentChatSelect.typeChat === 0) {
                const response = await services.getMessageFriends(currentUser._id, currentChatSelect.currentChat._id);
                setMessages(response);
            }
            if (currentChatSelect.currentChat && currentChatSelect.typeChat === 1) {
                const response = await services.getMessageGroup(currentChatSelect.currentChat._id);
                console.log(response);
                setMessages(response);
            }
        };
        fetchApi();
    }, [currentChatSelect, currentUser]);

    // submit chat
    const handleSendChatValue = async (value) => {
        // cancelTyping();
        //call socket
        const time = Date.now().toString();
        if (currentChatSelect.typeChat === 0) {
            let userData;
            if (currentUser) {
                userData = {
                    sender: {
                        _id: currentUser._id,
                        username: currentUser.username,
                        avatarImage: currentUser.avatarImage,
                    },
                    receiverId: currentChatSelect.currentChat._id,
                    message: { text: value },
                    createAt: time,
                };
            }
            socket.emit('send-message', {
                sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
                receiverId: currentChatSelect.currentChat._id,
                message: { text: value },
                createAt: time,
            });

            //call api
            await services.addMessageFriends(currentUser._id, currentChatSelect.currentChat._id, value);
            const msgs = [...messages];
            msgs.push({
                sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
                user: [currentUser._id, currentChatSelect.currentChat._id],
                message: { text: value },
                createAt: time,
            });
            setMessages(msgs);
        }
        if (currentChatSelect.typeChat === 1) {
            await services.addMessageFriends(currentUser._id, currentChatSelect.currentChat._id, value);
            const msgs = [...messages];
            msgs.push({
                sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
                user: [currentUser._id, currentChatSelect.currentChat._id],
                message: { text: value },
                createAt: time,
            });
            setMessages(msgs);
        }
    };

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    return !currentChatSelect.currentChat ? (
        <div className={cx('wrapper')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4">Welcome {currentUser.id}</Typography>
        </div>
    ) : (
        <div className={cx('wrapper')}>
            {/* header */}
            <HeaderChat currentChatSelect={currentChatSelect} />
            {/* chat container */}
            <ChatContainer currentUser={currentUser} message={messages} typingUsers={typingUsers} />
            {/* chat form */}
            <NewMessageForm handleSendChatValue={handleSendChatValue} />
        </div>
    );
}

export default Chat;
