import React from 'react';
import { connect } from 'react-redux';

import itemActions from '../actions/itemActions.js';


const SearchBar = ({ commitSearch }) => {
  let keywords;
  let zip;
  let category;
  return (
    <div className="search_bar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            category: category.value,
            keywords: keywords.value,
            zip: zip.value,
          };
          commitSearch(data);
          category.value = '';
          keywords.value = '';
          zip.value = '';
        }}
      >
        <input className="search_bar keywords" ref={(node) => { keywords = node; }} />
        <input className="search_bar zip" ref={(node) => { zip = node; }} />
        <input className="search_bar category" ref={(node) => { category = node; }} />

        <button>search</button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  commitSearch: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => (
  {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    },
  }
);

export default connect(null, mapDispatchToProps)(SearchBar);
