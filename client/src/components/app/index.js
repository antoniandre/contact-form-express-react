import React from 'react';
import { Route, Link } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from '../home'
import Contact from '../contact'
import Logo from './logo.svg'
import './index.css'

injectTapEventPlugin();

const App = () => (
    // Make Material UI available everywhere.
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="app">
            <header>
                <Link className="app-logo" to="/"><img src={Logo} alt="logo" /></Link>
                <Link className="menu-link" to="/">Home</Link>
                <Link className="menu-link" to="/contact-us">Contact</Link>
            </header>
            <main>
                <Route exact path="/" component={Home} />
                <Route exact path="/contact-us" component={Contact} />
            </main>
        </div>
    </MuiThemeProvider>
)

export default App