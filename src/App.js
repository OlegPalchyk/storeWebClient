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
                message: `API call failed: ${e}`,
                error : true,
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
            <div className="App-intro">
                {this.state.fetching
                    ? 'Fetching message from API'
                    :
                    <div>
                        {this.state.error?
                            <p>{this.state.message}</p>:
                            this.state.messages.map((item, index)=>{
                                return <p key={index}>{item}</p>
                            })}

                    </div>
                }
    </div>
        </div>
    );
    }
}

export default App;
