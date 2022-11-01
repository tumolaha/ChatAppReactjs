import classNames from 'classnames/bind';
import React from 'react';

import styles from './TypingAnimationCss.module.scss';
const cx = classNames.bind(styles);

const TypingAnimation = ({ name }) => {
    return (
        <div className={cx("dotsContainer")}>
            <p>{name} is typing</p>
            <span id={cx("dot1")}></span>
            <span id={cx("dot2")}></span>
            <span id={cx("dot3")}></span>
        </div>
    );
};

export default TypingAnimation;
