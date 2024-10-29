import './App.css';

import {  Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { PublicRoutes } from './Router/PublicRoute';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import Staticlayout from './pages/Layout/Layout';
function App() {

  const selector = useSelector(i => i)
  const selectorprivateroute = useSelector(i => i.privateroute)
 
 
  return (
    <>

      <Router>
        {selectorprivateroute ?
          <Staticlayout />
          :
          <Routes>
            {PublicRoutes.map((route) => {
              let Component = route.component
              return (
                <Route exact={true} key={route.name} path={route.path}
                  element={
                    <>
                      <Suspense fallback={"loading"}>
                        <Component />
                      </Suspense></>
                  } />
              )
            })}
          </Routes>}

      </Router >

    </>
  );
}

export default App;
