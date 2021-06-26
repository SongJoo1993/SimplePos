import "./Login.scss";
import { Component } from 'react'; 
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

class Login extends Component {
    
    state = {
        errorMessage : "",
        loginStatus: false,
    }
    
    render() {
        return (
            <section className="login-page">
                <Helmet>
                    <title>Simple POS - Login</title>
                </Helmet>
                <form className="login-page__box">
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
                    <Link to="/main" className="login-page__button"> Log In </Link>
                    <Link to="/" className="login-page__button"> Sign Up </Link>
                </form>
            </section>
        );
    }
}

export default Login