import React from 'react';
import Graph from './Graph';
import StatBar from '../Bars/StatBar'

type GraphGeneratorProps = {
    n: number,
    k: number,
    p: number,
    delay: number,
}

type GraphGeneratorState = {
    delay: {gen: number, calcL: number, calcC: number},
    adjList: Array<Array<number>>,
    vertexColors: Array<{i: number, color: string}>,
    edgeColors: Array<{edge: {i: number, j: number}, color: string}>,
    ghostEdges: Array<{edge: {i: number, j: number}, color: string}>,
    stats: {L: number, C: number},
    stage: string,
}

class GraphGenerator extends React.Component<GraphGeneratorProps, GraphGeneratorState> {
    constructor(props: GraphGeneratorProps) {
        super(props);
        
        this.state = {
            delay: {gen: this.props.delay, calcL: this.props.delay, calcC: this.props.delay},
            adjList: [],
            vertexColors: [],
            edgeColors: [],
            ghostEdges: [],
            stats: {L: -1, C: -1},
            stage: '',
        };

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async generate() {
        let adjList: GraphGeneratorState["adjList"] = [];
        for (let i: number = 0; i < this.props.n; i++) {
            adjList.push(Array(this.props.k));
            for (let j: number = 0; j < this.props.k / 2; j++) {
                adjList[i][j] = (i + j + 1) % this.props.n;
            }
            for (let j: number = 0; j < this.props.k / 2; j++) {
                adjList[i][j + this.props.k / 2] = (i - j - 1 + this.props.n) % this.props.n;
            }
        }

        this.setState({adjList: adjList, stage: 'Generating'});

        for (let j: number = 0; j < this.props.k / 2; j++) {
            for (let i: number = 0; i < this.props.n; i++) {
                let oldEnd: number = adjList[i][j];
                let newEnd: number = oldEnd;

                if (Math.random() < this.props.p) {
                    let excludedEnd: Array<number> = [i].concat(adjList[i]).sort(function(a, b){return a - b});
                    newEnd = Math.floor(Math.random() * (this.props.n - excludedEnd.length));
                    for (let ele of excludedEnd) {
                        if (newEnd >= ele) {
                            newEnd++;
                        }
                    }

                    let indexToRemove: number = adjList[oldEnd].indexOf(i);
                    adjList[oldEnd].splice(indexToRemove, 1);
                    adjList[i][j] = newEnd;
                    adjList[newEnd].push(i);
                }

                if (this.state.delay.gen !== 0) {
                    let vertexColors: GraphGeneratorState["vertexColors"] = [
                        {i: i, color: "green"},
                        {i: oldEnd, color: "red"},
                    ];
                    if (oldEnd === newEnd) {
                        vertexColors[1].color = 'green';
                    }
                    else {
                        vertexColors.push({i: newEnd, color: 'green'});
                    }
                    let edgeColors: GraphGeneratorState["edgeColors"] = [
                        {edge: {i: i, j: newEnd}, color: 'green'},
                    ];
                    let ghostEdges: GraphGeneratorState["ghostEdges"]  = [];
                    if (oldEnd !== newEnd) {
                        ghostEdges.push({edge: {i: i, j: oldEnd}, color: 'red'});
                    }

                    this.setState({adjList: adjList, vertexColors: vertexColors, edgeColors: edgeColors, ghostEdges: ghostEdges});
                    await new Promise(r => setTimeout(r, this.state.delay.gen * 1000));
                }
            }
        }

        this.setState({adjList: adjList, vertexColors: [], edgeColors: [], ghostEdges: []});
    }

    bfs(start: number, end: number): Array<number> {
        let queue: Array<number> = [start];
        let visited: Array<boolean> = Array(this.props.n).fill(false);
        visited[start] = true;
        let parent: Array<number> = Array(this.props.n).fill(-1);
        parent[start] = -1;

        while (queue.length > 0) {
            let cur: any = queue.shift();
            if (cur === end) {
                break;
            }

            for (const neighbor of this.state.adjList[cur]) {
                if (!visited[neighbor]) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                    parent[neighbor] = cur;
                }
            }
        }

        let path: Array<number> = [];

        let cur: number = end;
        while (parent[cur] !== -1) {
            path.push(cur);
            cur = parent[cur];
        }
        path.push(cur);

        return path;
    }

    async calculateL() {
        this.setState({stage: 'Calculating L'});

        let valid: number = 0;
        let totalL = 0;

        for (let i: number = 0; i < this.props.n - 1; i++) {
            for (let j: number = i + 1; j < this.props.n; j++) {
                let path: Array<number> = this.bfs(i, j);
                if (path.length !== 1) {
                    valid++;
                    totalL += path.length - 1;
                }

                if (this.state.delay.calcL !== 0)
                {
                    let vertexColors: GraphGeneratorState["vertexColors"] = [
                        {i: path[0], color: "green"},
                    ];
                    let edgeColors: GraphGeneratorState["edgeColors"] = [];
                    for (let k: number = 1; k < path.length; k++)
                    {
                        vertexColors.push({i: path[k], color: 'green'});
                        edgeColors.push({edge: {i: path[k - 1], j: path[k]}, color: 'green'});
                    }

                    this.setState({vertexColors: vertexColors, edgeColors: edgeColors});
                    await new Promise(r => setTimeout(r, this.state.delay.calcL * 1000));
                }
            }
        }

        let roundedL: number = Math.round(totalL / valid * 100) / 100;
        this.setState({stats: {L: roundedL, C: this.state.stats.C}, vertexColors: [], edgeColors: []});
    }

    async calculateC() {
        this.setState({stage: 'Calculating C'});

        let valid: number = 0;
        let totalC: number = 0;

        for (let i: number = 0; i < this.props.n; i++) {
            let neighbors: number = this.state.adjList[i].length;
            let totalPossibleEdges: number = neighbors * (neighbors - 1) / 2;
            if (totalPossibleEdges !== 0) {
                let totalEdges: number = 0
                for (let j: number = 0; j < neighbors - 1; j++) {
                    for (let k: number = j + 1; k < neighbors; k++) {
                        if (this.state.adjList[j].indexOf(k) !== -1) {
                            totalEdges++;
                        }
                    }
                }

                valid++;
                totalC += totalEdges / totalPossibleEdges;
            }
        }

        let roundedC: number = Math.round(totalC / valid * 100) / 100;
        this.setState({stats: {L: this.state.stats.L, C: roundedC}, vertexColors: [], edgeColors: []});
    }

    async calculate() {
        await this.calculateL();
        await this.calculateC();
    }

    // async handleSubmit(event: any) {
    //     this.setState({params: this.state.input, stage: ''});
    //
    //     await this.generate();
    // }
    //
    // renderInputBar() {
    //     return (
    //         <form onSubmit={this.handleSubmit}>
    //             <label>
    //                 n:
    //                 <input type="text"
    //                        value={this.state.input.n}
    //                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
    //                            this.setState({input: {n: parseInt(event.target.value), k: this.state.input.k, p: this.state.input.p, delay: this.state.input.delay}})
    //                        }
    //                 />
    //             </label>
    //         </form>
    //     );
    // }

    render() {
        return (
            <div className="graph-generator">
                {(this.state.stage.includes('Calculating')) &&
                <StatBar L={this.state.stats.L}
                         C={this.state.stats.C}
                />}
                {(this.state.stage !== '') &&
                <Graph key={'graph' + this.props.n}
                       n={this.props.n}
                       k={this.props.k}
                       adjList={this.state.adjList}
                       initialVertexColors={this.state.vertexColors}
                       initialEdgeColors={this.state.edgeColors}
                       ghostEdges={this.state.ghostEdges}
                />}
            </div>
        );
    }

    async componentDidMount() {
        await this.generate();
        await this.calculate();
    }
}

export default GraphGenerator;