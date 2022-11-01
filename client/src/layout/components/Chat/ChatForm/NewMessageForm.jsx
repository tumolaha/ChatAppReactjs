import { useState } from 'react';
//
import classNames from 'classnames/bind';
import styles from '../Chat.module.scss';
//ui
import { AttachFile, EmojiEmotions, Image, Send } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import useOutsideClick from '~/hooks/useOutsideClick';

const cx = classNames.bind(styles);
function NewMessageForm({ handleSendChatValue,   handleStartTyping,  handleStopTyping }) {
    const [valueFormChat, setValueFormChat] = useState('');

    const { showEmoji, setShowEmoji, ref } = useOutsideClick(false);

    const handleEmojiPickerHideShow = () => {
        setShowEmoji(true);
    };

    const handleEmojiClick = (event) => {
        let message = valueFormChat;
        message += event.native;
        setValueFormChat(message);
    };

    const handleSubmitChatValue = (event) => {
        event.preventDefault();
        if (valueFormChat.length > 0) {
            handleSendChatValue(valueFormChat);
            setValueFormChat('');
        }
    };

    return (
        <>
            <div className={cx('chat-value')}>
                <div className={cx('chat-value-control')}>
                    <div className={cx('emoji')}>
                        <IconButton onClick={handleEmojiPickerHideShow}>
                            <EmojiEmotions fontSize="large" />
                        </IconButton>
                        {showEmoji && (
                            <div className={cx('picker-emoji')}>
                                <div ref={ref}>
                                    <Picker data={data} theme="light" onEmojiSelect={handleEmojiClick} />
                                </div>
                            </div>
                        )}
                    </div>
                    <IconButton>
                        <AttachFile fontSize="large" />
                    </IconButton>
                    <IconButton>
                        <Image fontSize="large" />
                    </IconButton>
                </div>
                <form
                    onSubmit={handleSubmitChatValue}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                >
                    <div className={cx('chat-value-input')}>
                        <input
                            placeholder="Type your message"
                            style={{ width: '100%', outline: 'none', border: 'none' }}
                            value={valueFormChat}
                            onChange={(e) => setValueFormChat(e.target.value)}
                            onKeyPress={handleStartTyping}
                            onKeyUp={handleStopTyping}
                        />
                    </div>
                    <Button type="submit" variant="contained" endIcon={<Send />} color={'success'}>
                        Send
                    </Button>
                </form>
            </div>
        </>
    );
}

export default NewMessageForm;
