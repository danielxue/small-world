import React from 'react';

type StatBarProps = {
    L: number,
    C: number,
}

class StatBar extends React.Component<StatBarProps> {
    render() {
        return (
            <div className="stat-bar">
                <table>
                    <tbody>
                        <tr>
                            <th>Length (L)</th>
                            <th>Clustering (C)</th>

                        </tr>
                        <tr>
                            <td>{this.props.L !== -1 ? this.props.L : 'Calculating'}</td>
                            <td>{this.props.C !== -1 ? this.props.C : 'Calculating'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StatBar;