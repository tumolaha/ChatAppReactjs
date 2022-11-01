import React, { useState } from 'react';
import classNameNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { ChatRounded, GroupRounded, Home } from '@mui/icons-material';

const cx = classNameNames.bind(styles);

function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(true);

    return (
        <>
            <nav className={cx('nav', menuOpen && `open`)}>
                <div className={cx('sidebar')}>
                    <div className={cx('sidebar-content')}>
                        <ul className={cx('lists')}>
                            <li className={cx('list')}>
                                <div className={cx('nav-link')}>
                                    <Home className={cx('icon')} />
                                    <span className={cx('link')}>Dashboard</span>
                                </div>
                            </li>
                            <li className={cx('list')}>
                                <div className={cx('nav-link')}>
                                    <ChatRounded className={cx('icon')} />
                                    <span className={cx('link')}>Revenue</span>
                                </div>
                            </li>
                            <li className={cx('list')}>
                                <div className={cx('nav-link')}>
                                    <GroupRounded className={cx('icon')} />
                                    <span className={cx('link')}>Notifications</span>
                                </div>
                            </li>
                        </ul>

                        <div className={cx('bottom-content')}></div>
                    </div>
                </div>
            </nav>

            {/* <script>
      const navBar = document.querySelector("nav"),
        menuBtns = document.querySelectorAll(".menu-icon"),
        overlay = document.querySelector(".overlay");

      menuBtns.forEach((menuBtn) => {
        menuBtn.addEventListener("click", () => {
          navBar.classNameList.toggle("open");
        });
      });

      overlay.addEventListener("click", () => {
        navBar.classNameList.remove("open");
      });
    </script> */}
        </>
    );
}

export default Sidebar;
