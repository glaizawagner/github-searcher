import React from 'react';
import GithubForm from './components/form/GithubForm';
import ResultsDisplay from './components/results/ResultsDisplay';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      results: null,
      loading: false,
      active: false,
      error: null,
    }
  };

  getResults = (user) => {
    this.setState({loading: true})

    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => {
          this.setState({loading: false})
          if(res.ok) {
            return res.json()
          }
          throw new Error(res.statusText)
    })
    .then(resData => {
          if(resData.count === 0) {
            this.setState({
              results: null,
              active: true,
            })
          } else {
            this.setState({
              results: resData, 
              loading: false, 
              active: true
            })
          }
    })
    .catch(err => this.setState({error: err.message}))
  }

  render() {
    return (
      <main className="App">
        <h1>My Github Searcher...</h1>

        {this.state.error && <h2>Sorry,  error occurred: {this.state.error} </h2>}
        <ErrorBoundary>
          <GithubForm getResults={this.getResults}/>
        </ErrorBoundary>
        
        <ErrorBoundary>
          {this.state.active && <ResultsDisplay resultsDisplay={this.state.results}/>}
        </ErrorBoundary>
        
      </main>
    )
  }
}

