import React, { Component } from 'react';
import md5 from 'md5';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    };

    displayErrors(errors) {
        return errors.map((error, i) => <p key={i}>{error.message}</p> );
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    })
                })
        };
    }
    isFormValid = ({ email, password }) => email && password;
    // handleInputError(error, inputName) {
    //     error.message.toLowerCase().includes('email');
    // }
    render() {
        const { email, password, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />Ауторизация
                    </Header>
                    <Form onSubmit={this.handleSubmit.bind(this)} size="large">
                        <Segment stacked>
                            <Form.Input type="email" value={email} fluid name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={this.handleChange.bind(this)} />
                            <Form.Input type="password" value={password} fluid name="password" icon="lock" iconPosition="left" placeholder="Пароль" onChange={this.handleChange.bind(this)} />
                            <Button
                                className={loading ? 'loading' : ''}
                                color="violet"
                                fluid
                                size="large"
                                disabled={loading}
                                >Ввойти</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Ошибка</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;