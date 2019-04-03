import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

class UserPanel extends Component {
    state = {
        user: this.props.currentUser
    }
    // componentDidMount() {
    //     this.setState({ user: this.props.currentUser });
    // }
    dropdownOptions() {
        const { user } = this.state;
        return [
            {
                key: 'user',
                text: <span>Залогинился как <strong>{user && user.displayName}</strong></span>,
                disabled: true
            },
            {   
                key: 'avatar',
                text: <span>Сменить аватар</span>
            },
            {
                key: 'signout',
                text: <span onClick={this.handleSignout}>Разлогинится</span>
            }
        ]
    }
    handleSignout() {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('signout'))
    }
    render() {
        const { user } = this.state;
        return (
            <Grid style={{ background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>Chatik</Header.Content>
                        </Header>
                    </Grid.Row>

                    {/* User Dropdown */}
                    <Header style={{padding: '0.25em'}} as="h4" inverted>
                        <Dropdown
                            trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                </span>
                            }
                            options={this.dropdownOptions()}
                        />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);