import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Component } from 'react';
import axios from 'axios';
import Login from './pages/Login/index';
import Signup from './pages/Signup/index'
import Main from './pages/Main/index';
import Products from './pages/Products/index';

class App extends Component {

  state = {
    inventoryData: []
  }

  getInventoryItems = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/inventory`)
      .then((response) => {
        this.setState({
          inventoryData: response.data
        })
      })
      .catch((error) => {
        console.log(`Error: ${error}`)
      })
  }

  deleteInventoryItem = (category,section,id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/inventory/${category}/${section}/${id}`)
      .then(() => {
        return axios.get(`${process.env.REACT_APP_API_URL}/inventory`)
      })
      .then((response) => {
        this.setState({
          inventoryData: response.data
        })
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
      })
  }

  componentDidMount () {
    this.getInventoryItems();
  }

  render() {
    if(!this.state.inventoryData) {
      console.log("Menu is being Loaded...");
    }
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route 
              path="/main" 
              render={(routerProps) => (
                <Main 
                  inventoryData = {this.state.inventoryData}
                  {...routerProps}
                />
              )}
            />
            <Route 
              path="/products"
              render={(routerProps) => (
                <Products 
                  inventoryData = {this.state.inventoryData}
                  getInventoryItems ={this.getInventoryItems}
                  deleteInventoryItem={this.deleteInventoryItem}
                  {...routerProps}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;