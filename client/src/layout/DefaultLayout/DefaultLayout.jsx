import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layout/components/Header/Header';
import Sidebar from './Sidebar/Sidebar';
import SubSidebar from './SubSidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                
                <Sidebar />
                <SubSidebar/>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
