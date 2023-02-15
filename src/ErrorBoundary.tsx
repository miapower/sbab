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
        const {error} = this.state;

        if (error) {
            console.log(error);
            return(<div className="grid h-screen place-items-center bg-gradient-to-b from-green-200 to-green-500">
               <h1 className="text-4xl lg:text-6xl text-center">
                Något gick helt galet
                <br />😳</h1>
                <a className="text-2xl px-6 py-3 text-white-100 no-underline bg-green-500 rounded hover:bg-green-600 hover:underline hover:text-white-200" href="/">Gå tillbaka och försök igen 😎
                </a>
                </div>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;