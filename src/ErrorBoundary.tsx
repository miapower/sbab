import {ErrorInfo, ReactNode, Component} from 'react';

interface Props{
    children?: ReactNode;
}

interface State {
    error: Error | null;
    info: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {

    state = {
        error: null,
        info: null
    };

    componentDidCatch(error: Error, info: ErrorInfo) : void {
        this.setState({error, info});
    }

    render(): ReactNode {
        const {error, info} = this.state;

        if (error) {
            return(<>Något gick helt galet {info}</>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;