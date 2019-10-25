import React from 'react';

export default class  ResultsDisplay extends React.Component {
    render() {
        if(this.props.resultsDisplay === null || this.props.resultsDisplay.length === 0) {
            return (
                <p className="noResults">Sorry, No Results Found!</p>
            )
        } else {
            return (
                <ul>
                    {this.props.resultsDisplay.map(repo => {
                        return <li key={repo.id}>
                                <a href={repo.html_url}> {repo.name} </a>
                            </li>
                    })}
                </ul>
            )
        }
    }
}