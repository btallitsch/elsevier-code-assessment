import React, {Component} from 'react';
import { Input } from 'antd';

const Search = Input.Search;

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      searchTerm: ''
    };
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e){
    this.setState({
      searchTerm: e.target.value
    });
  }

  onSubmit(){
    this.props.onSearchTermChange(this.state.searchTerm);
  }

  render(){
    return (
      <div className="searchbar">
        <Search
          placeholder="7-digit patient ID number"
          allowClear
          enterButton="Search"
          onChange={this.onInputChange}
          onSearch={this.onSubmit}
        />
      </div>
    );
  }
}

export default SearchBar;