import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import styles from '../Chat.module.scss';
import ChatItem from '../ChatItem/ChatItem';
import { v4 as uuidv4 } from 'uuid';
import TypingAnimation from '~/components/TypingAnimation/TypingAnimation';

const cx = classNames.bind(styles);

function ChatContainer({ currentUser, message = [], typingUsers }) {
    const messagesEndRef = useRef();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [message]);
    return (
        <div className={cx('message')}>
            {message.map((item) => {
                return (
                    <ChatItem
                        key={uuidv4()}
                        value={item}
                        own={currentUser._id !== item.sender._id}
                        currentUser={currentUser}
                    />
                );
            })}
            {typingUsers.length > 0 && <TypingAnimation name={typingUsers.username} />}

            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatContainer;
