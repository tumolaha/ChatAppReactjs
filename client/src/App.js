import { Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes/Router';
import  {DefaultLayout}  from '~/layout';
import { useSelector } from 'react-redux';

function App() {
    const user =  useSelector((state)=> state.auth.login.currentUser);
    let routerUser = publicRoutes;
    if(user){
        routerUser =  privateRoutes;
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routerUser.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
