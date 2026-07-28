import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Search = (props) => {
  const { stateFilter, setStateFilter } = props;

  const searchHandler = (e) => {
    if (/^[a-z]*$/i.test(e.target.value) === false) {
      setStateFilter((prev) => ({ ...prev }));
    }
    setStateFilter((prev) => ({
      ...prev,
      countryIndex: [0, 8],
      searchQuery: e.target.value,
    }));
  };

  return (
    <div className="search">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="faMagnifyingGlass" />
      <input
        type="text"
        value={stateFilter.searchQuery}
        placeholder="Search for a country..."
        onChange={searchHandler}
      />
    </div>
  );
};

Search.propTypes = {
  setStateFilter: PropTypes.func,
  stateFilter: PropTypes.shape(),
};
Search.defaultProps = {
  setStateFilter: null,
  stateFilter: null,
};

export default Search;
