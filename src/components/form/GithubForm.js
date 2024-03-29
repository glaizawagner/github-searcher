import React  from 'react';
import ValidationError from '../validationError/ValidationError';

export default class GithubForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: {
                value: '',
                touched: false
            }
        }
    }

    updateSearchInput = (input) => {
        this.setState({searchInput: {value: input, touched: true}})
    }


    validateSearchInput = () => {
        if(this.state.searchInput.value === '' || this.state.searchInput.value === undefined){
            return 'Please enter github repo!'
        }
    }

    handleGetResults = (ev) => {
        ev.preventDefault();
        
        const { searchInput } = this.state;
        this.props.getResults(searchInput.value);
        ev.target.github_repoInput.value ='';
        this.setState({
            searchInput: '',
            touched: false
        })

    }

    render() {
        const searchInputError = this.validateSearchInput();
        return (
            <form className='github_Form' onSubmit={this.handleGetResults}>
                <label htmlFor="github_repoInput"> Search Repo here:</label>
                <input type="text" className="github_repoInput" name="github_repoInput" placeholder="Enter your GitHub" onChange={ev => this.updateSearchInput(ev.target.value)}/>
                {this.state.searchInput.touched && (<ValidationError message={searchInputError} />)} 
                
                <button type="submit" disabled ={this.validateSearchInput()}>Search</button>
            </form>
        );
    }
}