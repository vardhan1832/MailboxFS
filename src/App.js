import './App.css';
import SignUp from './screens/SignIn';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  return (
    <Switch>
      <Route path="/" exact>
          <SignUp/>
      </Route>
      <Route path='login'>
        <h1>Login</h1>
      </Route>
    </Switch>
  );
}

export default App;
