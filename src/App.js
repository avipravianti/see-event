import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import MyAccount from './pages/MyAccount/MyAccount';
import Detail from './pages/Detail';
import Search from './pages/Search'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/account" component={MyAccount} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/search" component={Search} />
        </Switch>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
