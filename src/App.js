import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            fetching: true
        };
    }

    componentDidMount() {
        fetch('/api')
            .then(response => {
            if (!response.ok) {
            throw new Error(`status ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
            this.setState({
                messages: json.passwords,
            fetching: false
        });
    }).catch(e => {
            this.setState({
                messages: `API call failed: ${e}`,
            fetching: false
        });
    })
    }

    render() {
        return (
            <div className="App">
            <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
            {'This is '}
            <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
            </a><br/>
            </p>
            <p className="App-intro">
                {this.state.fetching
                    ? 'Fetching message from API'
                    :
                    <div>
                        {this.state.messages.map((item, index)=>{
                            return <p key={index}>{item}</p>
                        })}
                    </div>
                }
    </p>
        </div>
    );
    }
}

export default App;
