import React from "react";

type InputBarProps = {
    initialInput: {n: number, k: number, p: number, delay: number},
    onSubmit: any,
}

type InputBarState = {
    input: {n: string, k: string, p: string, delay: string},
}

class InputBar extends React.Component<InputBarProps, InputBarState> {
    constructor(props: InputBarProps) {
        super(props);

        this.state = {
            input: {
                n: String(this.props.initialInput.n),
                k: String(this.props.initialInput.k),
                p: String(this.props.initialInput.p),
                delay: String(this.props.initialInput.delay),
            }
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        this.setState(prevState => ({
            input: {
                ...prevState.input,
                [event.target.name]: event.target.value,
            }
        }));

    }

    update() {
        this.props.onSubmit({
            n: parseInt(this.state.input.n),
            k: parseInt(this.state.input.k),
            p: parseFloat(this.state.input.p),
            delay: parseFloat(this.state.input.delay)
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.update.bind(this)}>
                    <label>
                        n:
                        <input type="text"
                               name="n"
                               value={this.state.input.n}
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </label>
                    <label>
                        k:
                        <input type="text"
                               name="k"
                               value={this.state.input.k}
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </label>
                    <label>
                        p:
                        <input type="text"
                               name="p"
                               value={this.state.input.p}
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </label>
                    <label>
                        delay:
                        <input type="text"
                               name="delay"
                               value={this.state.input.delay}
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </label>
                    <label>
                        <input type="submit"
                               name="generate"
                               value="Generate"
                               onChange={this.handleInputChange.bind(this)}
                        />
                    </label>
                </form>
            </div>
        );
    }
}

export default InputBar