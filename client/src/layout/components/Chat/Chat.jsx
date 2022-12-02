import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

//component
import * as servicesMessage from '~/services/messageService';
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
        // socket.on('get-online-user', (value) => {console.log(value);})
    }, []);

    useEffect(() => {
        socket.emit('add-user', currentUser._id);
    }, [currentUser]);

    // fetch message user
    useEffect(() => {
        const fetchApi = async () => {
            if (currentChatSelect.currentChat && currentChatSelect.typeChat === 0) {
                const response = await servicesMessage.getMessageFriends(
                    currentUser._id,
                    currentChatSelect.currentChat._id,
                );
                setMessages(response);
            }
            if (currentChatSelect.currentChat && currentChatSelect.typeChat === 1) {
                const response = await servicesMessage.getMessageGroup(currentChatSelect.currentChat._id);
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
            socket.emit('send-message', {
                // sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
                // receiverId: currentChatSelect.currentChat._id,
                // message: { text: value },
                // createAt: time,
                userData,
            });

            //call api
            await servicesMessage.addMessageFriends(currentUser._id, currentChatSelect.currentChat._id, value);
            const msgs = [...messages];
            // msgs.push({
            //     // sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
            //     // user: [currentUser._id, currentChatSelect.currentChat._id],
            //     // message: { text: value },
            //     // createAt: time,
            //     userData,
            // });

            setMessages([...msgs, userData]);
        }
        if (currentChatSelect.typeChat === 1) {
            let userGroup = {
                sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
                user: [currentChatSelect.currentChat.member],
                message: { text: value },
                groupId: currentChatSelect.currentChat._id,
                createAt: time,
            };
            await servicesMessage.addMessageGroups(
                currentChatSelect.currentChat._id,
                currentUser._id,
                currentChatSelect.currentChat.member,
                value,
            );
            const msgs = [...messages];
            // msgs.push({
            //     // sender: { _id: currentUser._id, username: currentUser.username, avatarImage: currentUser.avatarImage },
            //     // user: [currentUser._id, currentChatSelect.currentChat._id],
            //     // message: { text: value },
            //     // createAt: time,
            //     userGroup,
            // });
            // console.log(msgs);
            setMessages([...msgs, userGroup]);
            // console.log(msgs);
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
