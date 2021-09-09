import React from 'react';
import GraphGenerator from './Graph/GraphGenerator';
import InputBar from "./Bars/InputBar";

type AppState = {
    key: number,
    input: {n: number, k: number, p: number, delay: number},
}

class App extends React.Component<any, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            key: 1,
            input: {n: 16, k: 4, p: 0.5, delay: 0.1},
        }
    }

    onSubmit(input: any) {
        this.setState({key: this.state.key + 1, input: input})
    }

    render() {
        return (
            <div key={'app-' + this.state.key}>
                <InputBar initialInput={this.state.input}
                          onSubmit={this.onSubmit.bind(this)}
                />
                <GraphGenerator n={this.state.input.n}
                                k={this.state.input.k}
                                p={this.state.input.p}
                                delay={this.state.input.delay}
                />
            </div>
        );
    }
}

export default App;