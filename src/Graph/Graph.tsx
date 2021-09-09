import React from 'react';
import LineTo from 'react-lineto';
import RadialRender from 'react-radial-render';
import './Graph.css';

type GraphProps = {
    n: number,
    k: number,
    adjList: Array<Array<number>>,
    initialVertexColors: Array<{i: number, color: string}>,
    initialEdgeColors: Array<{edge: {i: number, j: number}, color: string}>
    ghostEdges: Array<{edge: {i: number, j: number}, color: string}>,
}

// type GraphState = {
//     vertexColors: Array<{i: number, color: string}>,
//     edgeColors: Array<{edge: {i: number, j: number}, color: string}>,
// }

class Graph extends React.Component<GraphProps> {
    // state = {
    //     vertexColors: this.props.initialVertexColors,
    //     edgeColors: this.props.initialEdgeColors,
    // };

    colorOfVertex(vertex: number): string {
        for (let ele of this.props.initialVertexColors) {
            if (ele.i === vertex) {
                return ele.color;
            }
        }
        return 'black';
    }

    colorOfEdge(edge: {i: number, j: number}): string {
        for (let ele of this.props.initialEdgeColors) {
            if ((ele.edge.i === edge.i && ele.edge.j === edge.j) ||
                (ele.edge.j === edge.i && ele.edge.i === edge.j)) {
                return ele.color;
            }
        }
        return 'black';
    }

    renderAdjListTable() {
        const adjListTable = this.props.adjList.map((ends: Array<number>, vertex: number) => {
            const columns = ends.map((end: number, endInd: number) => {
                return (
                    <td key={'' + vertex + '-' + endInd} style={{color: this.colorOfEdge({i: vertex, j: end})}}>{end}</td>
                )
            });
            return (
                <tr key={'' + vertex}>
                    <th key={'' + vertex + '-label'} style={{color: this.colorOfVertex(vertex)}}>{vertex}</th>
                    {columns}
                </tr>
            )
        });

        return (
            <table>
                <tbody>
                    {adjListTable}
                </tbody>
            </table>
        );
    }

    renderDiagram() {
        let vertices = [];
        for (let i: number = 0; i < this.props.n; i++) {
            vertices.push(<button className={'vertex vertex-' + i} style={{background: this.colorOfVertex(i)}} />);
        }
        let edges = [];
        for (let i: number = 0; i < this.props.n; i++) {
            for (let j of this.props.adjList[i].slice(0, this.props.k / 2)) {
                edges.push(<LineTo className={'edge'}
                                   key={'edge-' + i + ',' + j}
                                   from={'vertex-' + i}
                                   to={'vertex-' + j}
                                   borderColor={this.colorOfEdge({i: i, j: j})}
                                   borderWidth={3}
                />);
            }
        }
        for (let ele of this.props.ghostEdges) {
            edges.push(<LineTo className={'edge'}
                               key={'edge-' + ele.edge.i + ',' + ele.edge.j}
                               from={'vertex-' + ele.edge.i}
                               to={'vertex-' + ele.edge.j}
                               borderColor={ele.color}
                               borderWidth={3}
            />);
        }

        return (
            <div className="graph">
                <div className="vertices">
                    <RadialRender r={256}>
                        {vertices}
                    </RadialRender>
                </div>
                <div className="edges">
                    {edges}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="diagram">
                    {this.renderDiagram()}
                </div>
                {/*<div className="adj-table">*/}
                {/*    {this.renderAdjListTable()}*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Graph;