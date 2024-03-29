import React from 'react';


export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true}
    }
    render() {
        if(this.state.hasError) {
            return (
                <h2 className="error_boundary">Sorry, something went wrong</h2>
            );
        }
            return (
                this.props.children
            );
    }
}