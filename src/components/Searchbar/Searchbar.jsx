import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    serchQuery: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.serchQuery);

    this.reset();
  };

  reset = () => {
    this.setState({ serchQuery: '' });
  };

  render() {
    const { serchQuery } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            name="serchQuery"
            autoFocus
            placeholder="Search images and photos"
            value={serchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
