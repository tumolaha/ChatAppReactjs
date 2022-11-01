// Layouts
import { HeaderOnly } from '~/layout';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Login from '~/pages/Login/login';
import Register from '~/pages/Register/Register';


// Public routes
const publicRoutes = [
    { path: '/', component: Login , layout: HeaderOnly },
    { path: '/register', component: Register , layout: HeaderOnly },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

export { publicRoutes, privateRoutes };
