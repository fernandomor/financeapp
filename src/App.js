import './App.css';
import Header from './components/Header'
import CurrenciesRates from './components/CurrenciesRates'
import Sidebar from './components/Sidebar'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
function App() {
  return (
    <div className="flex">
    <Router>
          <Header />
          <Sidebar />
          <Switch>
            <Route exact path="/:currency" component={CurrenciesRates} />
          </Switch>
      </Router>
    </div>
  );
}
export default App;