import "./Login.scss";
import { Component } from 'react'; 
import Profile from "../../components/LoginComponents/Profile/index";

class Login extends Component {
    
    state = {
        isSignedUp: false,
        isLoggedIn: false,
        isLoginError: false,
        errorMessage: "",
    };
    
    renderSignUp() {
        return (
        <div>
            <h1>SignUp</h1>
            <form ref={(form) => (this.signUpForm = form)}>
                <div className="form-group">
                    Username: <input type="text" name="username" />
                </div>
                <div className="form-group">
                    Name: <input type="text" name="name" />
                </div>
                <div className="form-group">
                    Password: <input type="password" name="password" />
                </div>
                <button className="btn btn-primary" onClick={this.signup}>
                    Signup
                </button>
            </form>
        </div>
        );
    }

    renderLogin = () => {
        const { isLoginError, errorMessage } = this.state;
        return (
        <div>
            <h1>Login</h1>
            {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
            <form ref={(form) => (this.loginForm = form)}>
                <div className="form-group">
                    Username: <input type="text" name="username" />
                </div>
                <div className="form-group">
                    Password: <input type="password" name="password" />
                </div>
                <button className="btn btn-primary" onClick={this.login}>
                    Login
                </button>
            </form>
        </div>
        );
    };
    
    render() {
        const { isLoggedIn, isSignedUp } = this.state;

    // Handle the Signup/Login
    if (!isLoggedIn) return this.renderLogin();
    if (!isSignedUp) return this.renderSignUp();

        return (
        <div className="App">
            <Profile />
        </div>
        );
    }
}

export default Login