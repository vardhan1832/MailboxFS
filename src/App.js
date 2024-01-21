import './App.css';
import SignUp from './screens/SignIn';
import Login from './screens/Login';
import MailBox from './screens/MailBox';
import NavbarComponent from './components/Navbar';
import Inbox from './screens/Inbox';
import Sent from './screens/Sent';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Fragment } from 'react';
function App() {
  return (
    <Fragment>
      <NavbarComponent/>
    <Switch>
      <Route path="/" exact>
          <SignUp/>
      </Route>
      <Route path='/login'>
          <Login/>
      </Route>
      <Route path="/inbox">
          <Inbox/>
      </Route>
      <Route path="/sent">
          <Sent/>
      </Route>
      <Route path='/mailbox'>
          <MailBox/>
      </Route>
    </Switch>
    </Fragment>
  );
}

export default App;
