import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

export default class UserPanel extends Component {
    dropdownOptions() {
        return [
            {
                key: 'user',
                text: <span>Залогинится как <strong>Пользователь</strong></span>,
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
                <Dropdown trigger={<span>Пользователь</span>} options={this.dropdownOptions()} />
            </Header>
            </Grid.Column>
        </Grid>
    )
    }
}
