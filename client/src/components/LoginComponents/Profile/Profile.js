import { Component } from "react";

const baseUrl = "http://localhost:8080";
const profileUrl = `${baseUrl}/profile`;

class Profile extends Component {
    state = {
        isLoading: true,
        userInfo: {},
    };
    componentDidMount() {
    // here grab token from sessionStorage
    }
    render() {
        const { isLoading, userInfo } = this.state;
        return isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo.name}!</h1>;
    }
}

export default Profile;
