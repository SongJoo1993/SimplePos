import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Component } from 'react';
import axios from 'axios';
import Login from './pages/Login/index';
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
    console.log("delete function reached!")
    console.log(category, section, id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/inventory/${category}/${section}/${id}`)
      .then(() => {
        console.log("first then passed");
        return axios.get(`${process.env.REACT_APP_API_URL}/inventory`)
      })
      .then((response) => {
        console.log("second then passed");
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