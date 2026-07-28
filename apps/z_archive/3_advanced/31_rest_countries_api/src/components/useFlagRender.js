import axios from 'axios';
import { useEffect, useState } from 'react';

function useFlagRender(countries, region, query, countryIndex, modal, setCountrySelect) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [output, setOutput] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutput([]);
  }, [region, query, modal]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const promises = countries.map((country) =>
          axios({
            method: 'GET',
            timeout: 2000,
            url: country.flag,
          })
        );
        const flagData = await Promise.allSettled(promises);

        const amendSVG = (svgData) => {
          // Parsing SVG and inserting the 'preserveAspectRatio' attribute
          const svg = new DOMParser().parseFromString(svgData, 'image/svg+xml');
          svg.querySelector('svg').setAttribute('preserveAspectRatio', 'none');
          const newSVG = new XMLSerializer().serializeToString(svg);
          return newSVG;
        };

        const flagOutput = flagData.map((promise) => {
          return promise.status === 'fulfilled' ? amendSVG(promise.value.data) : '/assets/Pirate_Flag.png';
        });

        const mergeFlagToSlice = countries.map((country, i) => {
          return { ...country, flag: flagOutput[i] };
        });

        setOutput(mergeFlagToSlice);
        setLoading(false);
        if (setCountrySelect) {
          setCountrySelect(...mergeFlagToSlice);
        }
      } catch (error_) {
        console.log(error_);
        setError(true);
      }
    }
    fetchData();
  }, [countryIndex, region, query, countries, setCountrySelect]);
  return { error, loading, output };
}

export default useFlagRender;
