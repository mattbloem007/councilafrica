import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './App.scss';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withAuth from './withAuth';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Edit from './components/Edit';
//import Create from './components/Create';
// import Show from './components/Show';
//import Login from './Login'
const Login = React.lazy(() => import('./Login/Login'));
const Register = React.lazy(() => import('./Register/Register'));
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Chat = React.lazy(() => import('./ChatRoom/Chat'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;




const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
});


ReactDOM.render(
<React.Suspense fallback={loading()}>

<Router>
    <ApolloProvider client={client}>
        <div>
            { /**<Route path="/login" name="Home" render={props => <Login {...props}/>} />
                        <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
            <Route path="/" render={props => <DefaultLayout {...props}/>} />
        </div>
    </ApolloProvider>
 </Router>
 </React.Suspense>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
