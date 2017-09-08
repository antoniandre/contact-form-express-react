import React from 'react';
import { Route, Link } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from './logo.svg'
import './index.css'

injectTapEventPlugin();

const App = () => (
    // Make Material UI available everywhere.
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="app">
            <div className="App-header">
                <img src={Logo} className="app-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    </MuiThemeProvider>
)

export default App