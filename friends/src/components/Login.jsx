import React from 'react';
import axios from 'axios';

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

    handleSubmit = event => {
        event.preventDefault();
        axios.post('/api/login', this.state.credentials)
            .then(request => {
                window.localStorage.setItem('token', request.data.payload);
                this.props.history.push('/protected');

            })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>UserName</label>
                    <input type='text' name='username'
                    value={this.state.credentials.username}
                    onChange={this.handleChange}/>

                    <label>Password</label>
                    <input type='text' name='password'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
export default Login;