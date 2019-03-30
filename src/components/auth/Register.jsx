import React, { Component } from 'react';
import md5 from 'md5';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
    };
    isFormValid() {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: 'Заполните все поля' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Неправильный пароль '};
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            return true;
        }
    }
    isFormEmpty({ username, email, password, passwordConfirmation }) {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    isPasswordValid({ password, passwordConfirmation }) {
        if(password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        };
    }
    displayErrors(errors) {
        return errors.map((error, i) => <p key={i}>{error.message}</p> );
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        if(this.isFormValid()) {
            this.setState({ errors: [], loading: true });
            event.preventDefault();
            const { email, password } = this.state;
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=indenticon`
                    })
                    .then(() => {
                        this.saveUser(createdUser).then(() => {
                            console.log('user saved');
                        })
                        // this.setState({ loading: false });
                    })
                    .catch(error => {
                        this.setState({ errors: this.state.errors.concat(error), loading: false })
                        console.error(error);
                    })
                })
                .catch(error => {
                    this.setState({ error: this.state.errors.concat(error) , loading: false });
                    console.error(error)
                });
        };
    }
    saveUser(createdUser) {
        // return
    }
    // handleInputError(error, inputName) {
    //     error.message.toLowerCase().includes('email');
    // }
    render() {
        const {username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />Регистрация
                    </Header>
                    <Form onSubmit={this.handleSubmit.bind(this)} size="large">
                        <Segment stacked>
                            <Form.Input type="text" value={username} fluid name="username" icon="user" iconPosition="left" placeholder="Имя" onChange={this.handleChange.bind(this)} />
                            <Form.Input type="email" value={email} fluid name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={this.handleChange.bind(this)} />
                            <Form.Input type="password" value={password} fluid name="password" icon="lock" iconPosition="left" placeholder="Пароль" onChange={this.handleChange.bind(this)} />
                            <Form.Input type="password" value={passwordConfirmation} fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Подтверждение пароля" onChange={this.handleChange.bind(this)} />
                            <Button
                                className={loading ? 'loading' : ''}
                                color="orange"
                                fluid
                                size="large"
                                disabled={loading}
                                >Зарегистрировать</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Ошибка</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Уже зарегистрированые? <Link to="/login">Ввойти</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;