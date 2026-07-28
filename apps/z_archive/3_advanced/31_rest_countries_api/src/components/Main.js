import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import Filter from './Filter';
import Grid from './Grid';
import Modal from './Modal';
import Search from './Search';
import useFlagRender from './useFlagRender';

const Main = (props) => {
  const { countriesList, alphaList } = props;
  const [stateFilter, setStateFilter] = useState({
    activeRegion: 'all',
    countryIndex: [0, 8],
    searchQuery: '',
  });
  const [modal, setModal] = useState(false);
  const [countrySelect, setCountrySelect] = useState();

  const regionFilter = useMemo(
    () =>
      countriesList.filter((country) => {
        if (stateFilter.activeRegion === 'all') return country;
        if (
          stateFilter.activeRegion === 'Polar' &&
          (country.region === 'Polar' || country.region === 'Antarctic' || country.region === 'Antarctic Ocean')
        )
          return country;
        return stateFilter.activeRegion === country.region ? country : false;
      }),
    [stateFilter.activeRegion, countriesList]
  );

  const searchFilter = (() => {
    if (stateFilter.searchQuery === '') return regionFilter;
    const regex = new RegExp(`^${stateFilter.searchQuery}`, 'i');
    return regionFilter.filter((country) => (regex.test(country.name) ? country : false));
  })();

  const currentSlice = useMemo(() => {
    return searchFilter.slice(stateFilter.countryIndex[0], stateFilter.countryIndex[1]);
  }, [searchFilter, stateFilter.countryIndex]);

  const { output, loading } = useFlagRender(
    currentSlice,
    stateFilter.activeRegion,
    stateFilter.searchQuery,
    stateFilter.countryIndex,
    modal
  );

  return (
    <>
      {modal && (
        <Modal
          country={countrySelect}
          countriesList={countriesList}
          alphaList={alphaList}
          setModal={setModal}
          setStateFilter={setStateFilter}
        />
      )}
      <main>
        <div className="options-panel">
          <Search stateFilter={stateFilter} setStateFilter={setStateFilter} />
          <Filter stateFilter={stateFilter} setStateFilter={setStateFilter} />
        </div>
        <Grid
          filteredCountries={output}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          setCountrySelect={setCountrySelect}
          setModal={setModal}
          loading={loading}
          modal={modal}
        />
      </main>
    </>
  );
};

Main.propTypes = {
  alphaList: PropTypes.shape({}),
  countriesList: PropTypes.arrayOf(PropTypes.shape({})),
};

Main.defaultProps = {
  alphaList: null,
  countriesList: null,
};

export default Main;
