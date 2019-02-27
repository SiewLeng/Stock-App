import React from 'react';
import { hot } from 'react-hot-loader';

import Portfolio from './components/portfolio/portfolio';
import Search from './components/search/search';

class App extends React.Component {
    constructor () {
        super();
        this.state= {
            message: "hello",
            showSearch: false,
            showPortfolio: false,
        }
        this.toggleSearch = this.toggleSearch.bind(this);
        this.togglePortfolio = this.togglePortfolio.bind(this);
    }

    toggleSearch() {
        this.setState({showSearch: true});
        this.setState({showPortfolio: false});
    }

    togglePortfolio() {
        this.setState({showPortfolio: true});
        this.setState({showSearch: false});
    }

    render() {
        return (
            <div>
                <h1> Stock Simulator </h1>
                <nav>
                    <button onClick={this.toggleSearch}> Search Stock </button>
                    <button onClick={this.togglePortfolio}> My Porfolio </button>
                </nav>
                <div>
                    {this.state.showSearch && <Search/>}
                </div>
                <div>
                    {this.state.showPortfolio && <Portfolio/>}
                </div>
            </div>
        );
    }
}

export default hot(module)(App);