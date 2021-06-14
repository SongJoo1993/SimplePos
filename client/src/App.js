import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './pages/Main/index';
import Login from './pages/Login/index';
import Products from './pages/Products/index';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/products" component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
