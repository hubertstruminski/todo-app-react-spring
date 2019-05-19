import React from 'react';
import AuthenticationService from './AuthenticationService';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'user',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    }

    loginClicked() {
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(() => {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch( () => {
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true});
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                    <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked} >Login</button>
                </div>
            </div>
        );
    }
}

function ShowInvalidCredentials(props) {
    if(props.hasLoginFailed) {
        return <div className="alert alert-warning">Invalid Credentials</div>;
    }
    return null;
}

function ShowLoginSuccessMessage(props) {
    if(props.showSuccessMessage) {
        return <div>Login Successful.</div>
    }
    return null;
}

export default LoginComponent;