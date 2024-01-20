import './App.css';
import SignUp from './screens/SignIn';
import Login from './screens/Login';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  return (
    <Switch>
      <Route path="/" exact>
          <SignUp/>
      </Route>
      <Route path='/login'>
          <Login/>
      </Route>
      <Route path='/mailbox'>
          <h1>Mail Box</h1>
      </Route>
    </Switch>
  );
}

export default App;
