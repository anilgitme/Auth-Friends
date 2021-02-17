import React from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth'

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
        }
    };

    handleChange = event => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            },
            error: ''
        })
    }

    login = event => {
        event.preventDefault();
        axiosWithAuth()
        .post('/api/login', this.state.credentials)
        // axios.post('/api/login', this.state.credentials)
            .then(request => {
                window.localStorage.setItem('token', request.data.payload);
                this.props.history.push('/protected');
                this.props.setLoggedIn(true);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <label>UserName</label>
                    <input type='text' name='username'
                    value={this.state.credentials.username}
                    onChange={this.handleChange}/>

                    <label>Password</label>
                    <input type='text' name='password'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}/>
                    <button>login</button>
                </form>
            </div>
        )
    }
}
export default Login;