import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import firebase from './firebase';

import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser } from './actions';

const store = createStore(rootReducer, composeWithDevTools())


class Root extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user);
                this.props.history.push("/");
            }
        })
    }
    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading,
    
});
const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch);

const RootWithAuth = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>, document.getElementById('root'));
