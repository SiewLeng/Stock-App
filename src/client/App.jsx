import React from 'react';
import { hot } from 'react-hot-loader';

import Portfolio from './components/portfolio/portfolio';
import Search from './components/search/search';
import Sold from './components/sold/sold';
import Login from './components/login/login';
import Register from './components/register/register';

class App extends React.Component {
    constructor () {
        super();
        this.state= {
            message: "Please Login.",
            user_id: null,
            showSearch: false,
            showPortfolio: false,
            showSold: false,
            showLogin: false,
            showRegister: false,
        }

        this.toggleSearch = this.toggleSearch.bind(this);
        this.togglePortfolio = this.togglePortfolio.bind(this);
        this.toggleSold = this.toggleSold.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.setUserId = this.setUserId.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.closeRegister = this.closeRegister.bind(this);
    }

    closeLogin() {
        this.setState({showLogin: false});
    }

    closeRegister() {
        this.setState({showRegister: false});
    }

    setMessage(message) {
        this.setState({message: message});
    }

    setUserId(id) {
        this.setState({user_id: id});
    }

    toggleSearch() {
        this.setState({showSearch: true});
        this.setState({showPortfolio: false});
        this.setState({showSold: false});
        this.setState({showLogin: false});
        this.setState({showRegister: false});
    }

    togglePortfolio() {
        this.setState({showPortfolio: true});
        this.setState({showSearch: false});
        this.setState({showSold: false});
        this.setState({showLogin: false});
        this.setState({showRegister: false});
    }

    toggleSold() {
        this.setState({showSold: true});
        this.setState({showPortfolio: false});
        this.setState({showSearch: false});
        this.setState({showLogin: false});
        this.setState({showRegister: false});
    }

    toggleLogin() {
        this.setState({showLogin: true});
        this.setState({showSold: false});
        this.setState({showPortfolio: false});
        this.setState({showSearch: false});
        this.setState({showRegister: false});
    }

    toggleRegister() {
        this.setState({showLogin: false});
        this.setState({showSold: false});
        this.setState({showPortfolio: false});
        this.setState({showSearch: false});
        this.setState({showRegister: true});
    }

    render() {
        return (
            <div>
                <h1> Stock Simulator </h1>
                <nav>
                    <button onClick={this.toggleSearch}> Search Stock </button>
                    <button onClick={this.togglePortfolio}> My Porfolio </button>
                    <button onClick={this.toggleSold}> Stock Sold </button>
                    <button onClick={this.toggleLogin}> Login </button>
                    <button onClick={this.toggleRegister}> Register </button>
                </nav>
                <div>
                    <h3> {this.state.message} </h3>
                </div>
                <div>
                    {this.state.user_id && this.state.showSearch && <Search user_id={this.state.user_id}/>}
                </div>
                <div>
                    {this.state.user_id && this.state.showPortfolio && <Portfolio user_id={this.state.user_id}/>}
                </div>
                <div>
                    {this.state.user_id && this.state.showSold && <Sold user_id={this.state.user_id}/>}
                </div>
                <div>
                    {this.state.showLogin && <Login setMessage={this.setMessage} setUserId={this.setUserId} closeLogin={this.closeLogin}/>}
                </div>
                <div>
                    {this.state.showRegister && <Register/>}
                </div>
            </div>
        );
    }
}

export default hot(module)(App);