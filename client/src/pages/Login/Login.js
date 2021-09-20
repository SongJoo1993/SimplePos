import "./Login.scss";
import { Component } from 'react'; 
import {NavLink, Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Signup from "../Signup/index";
import axios from "axios"

class Login extends Component {
    
    state = {
        token: "",
        userData: {},
        userFound: null,
        failedAuth: false
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Update proceeded!")
        const token = sessionStorage.getItem("token");

        axios
            .get("http://localhost:8080/api/v1/users/current", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                if(prevState.failedAuth !== this.state.failedAuth) {
                    this.setState ({
                        userFound: true,
                        userData: response.data,
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/v1/users/login', {
            email: event.target[0].value,
            password: event.target[1].value,
        })
        .then(response => {
            sessionStorage.setItem("token", response.data.token)
            this.setState({
                failedAuth: true,
            })
            console.log(response);
        })
    }


    render() {
        console.log("rendering!")
        console.log(this.state.userFound);
        return (
            <section className="login-page">
                <Helmet>
                    <title>Simple POS - Login</title>
                </Helmet>
                <form className="login-page__box" onSubmit={this.handleSubmit}>
                    <h1 className="login-page__welcome">Welcome to Simple POS!</h1>
                    <div className="login-page__field">
                        <label htmlFor="Email" className="login-page__label">
                            Email
                        </label>
                        <input type="text" id="Email" name="Email" className="login-page__input" />
                        <label htmlFor="Email" className="login-page__label">
                            Password
                        </label>
                        <input type="password" id="password" name="password" className="login-page__input" />
                    </div>
                    <button className="login-page__button"> Log In </button>
                    <NavLink to='/signup' className="login-page__button"> Sign Up </NavLink>
                </form>
                {this.state.userFound && 
                    <Redirect to = {{
                        pathname: "/main",
                        state: { userData: this.state.userData}}}
                    />
                }
            </section>
        );
    }
}

export default Login