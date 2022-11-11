
import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { AddressBook, ChatCircleDots, Gear, Info, User, UsersThree } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentItem } from '~/redux/Layout/selectedSidebarSlice';

const cx = className.bind(styles);

function Sidebar() {
    // const [menuOpen, setMenuOpen] = useState(true);
    const dispatch = useDispatch();

    const select =  useSelector(state=>state.sidebar.currentItem.selected)
    return (
        <>
            <nav className={cx('navbar')}>
                <ul className={cx('navbar__menu')}>
                    <li className={cx('navbar__item')}>
                        <div className={select === 1 ? cx('navbar__link','active') : cx('navbar__link')} onClick={()=>dispatch(setCurrentItem(1))}>
                            <User size={25} />
                            <span>Profile</span>
                        </div>
                    </li>
                    <li className={cx('navbar__item')}>
                        <div className={select === 2 ? cx('navbar__link','active') : cx('navbar__link')} onClick={()=>dispatch(setCurrentItem(2))}>
                            <ChatCircleDots size={25} />
                            <span>Messages</span>
                        </div>
                    </li>
                    <li className={cx('navbar__item')}>
                        <div className={select === 3 ? cx('navbar__link','active') : cx('navbar__link')} onClick={()=>dispatch(setCurrentItem(3))}>
                            <UsersThree size={25} />
                            <span>Group</span>
                        </div>
                    </li>
                    <li className={cx('navbar__item')}>
                        <div className={select === 4 ? cx('navbar__link','active') : cx('navbar__link')} onClick={()=>dispatch(setCurrentItem(4))}>
                            <AddressBook size={25} />
                            <span>Contacts</span>
                        </div>
                    </li>
                    <li className={cx('navbar__item')}>
                        <div className={select === 5 ? cx('navbar__link','active') : cx('navbar__link')} onClick={()=>dispatch(setCurrentItem(5))}>
                            <Info size={25} />
                            <span>Help</span>
                        </div>
                    </li>

                </ul>
            </nav>

            {/* <script>
      const navBar = document.querySelector("nav"),
        menuBtns = document.querySelectorAll(".menu-icon"),
        overlay = document.querySelector(".overlay");

      menuBtns.forEach((menuBtn) => {
        menuBtn.addEventListener("click", () => {
          navBar.classNameNameList.toggle("open");
        });
      });

      overlay.addEventListener("click", () => {
        navBar.classNameNameList.remove("open");
      });
    </script> */}
        </>
    );
}

export default Sidebar;
