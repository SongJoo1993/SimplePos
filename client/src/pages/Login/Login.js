import "./Login.scss";
import { Component } from 'react'; 
import { Redirect, Link } from 'react-router-dom'; 
// import Profile from "../../components/LoginComponents/Profile/index";

class Login extends Component {
    
    // state = {
    //     isSignedUp: false,
    //     isLoggedIn: false,
    //     isLoginError: false,
    //     errorMessage: "",
    // };
    
    // renderSignUp() {
    //     return (
    //     <div>
    //         <h1>SignUp</h1>
    //         <form ref={(form) => (this.signUpForm = form)}>
    //             <div className="form-group">
    //                 Username: <input type="text" name="username" />
    //             </div>
    //             <div className="form-group">
    //                 Name: <input type="text" name="name" />
    //             </div>
    //             <div className="form-group">
    //                 Password: <input type="password" name="password" />
    //             </div>
    //             <button className="btn btn-primary" onClick={this.signup}>
    //                 Signup
    //             </button>
    //         </form>
    //     </div>
    //     );
    // }

    // renderLogin = () => {
    //     const { isLoginError, errorMessage } = this.state;
    //     return (
    //     <div>
    //         <h1>Login</h1>
    //         {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
    //         <form ref={(form) => (this.loginForm = form)}>
    //             <div className="form-group">
    //                 Username: <input type="text" name="username" />
    //             </div>
    //             <div className="form-group">
    //                 Password: <input type="password" name="password" />
    //             </div>
    //             <button className="btn btn-primary" onClick={this.login}>
    //                 Login
    //             </button>
    //         </form>
    //     </div>
    //     );
    // };
    
    render() {
        return (
            <main className="login-page">
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
            </main>
        );
    }
}

export default Login