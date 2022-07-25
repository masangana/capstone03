import { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../redux/countries/countries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGear, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import formatNumber from '../utils/formatNumber';
import Select from 'react-select';
import './Home.css';
import map from '../../assets/afric.png';
import Grid from './Grid';

const optionSelect = [
  { value: 'Africa', label: 'Africa' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'South America', label: 'South America' },
];
let continent = 'Africa';

const Home = () => {
  const [selected, setSelected] = useState(optionSelect[0].value);
  
  const handleChange = event => {
    console.log('change2 '+event.target.value);
    setSelected(event.target.value);
    continent = event.target.value;
    dispatch(fetchCountries(continent));
  };

  console.log('change '+continent);
  const dispatch = useDispatch();
  const { items, totalConfirmed, loading } = useSelector((state) => ({
    ...state.countries,
    loading: state.loadingBar.default,
  }));

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchCountries(continent));
    }
  }, []);

  if (loading) {
    return null;
  }

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: 'red',
        primary25: 'green',
      },
    }
  }

  return (
    <section>
      <header className="App-header">
        <FontAwesomeIcon icon={faArrowLeft} />
        <h4>2022</h4>
        <h5 className="App-header-title">most views</h5>
       
        <select value={selected} onChange={handleChange}>
          {optionSelect.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <FontAwesomeIcon icon={faMicrophone} />
        <div className="pl-5">
          <FontAwesomeIcon icon={faGear} />
        </div>
      </header>
      <div className="Home-banner">
        <div className="Home-banner-left">
          <img src={map} alt="Banner view" className="App-map" />
        </div>
        <div className="Home-banner-right">
          <h1 className="App-title">{continent}</h1>
          <p className="App-subtitle">
            {`${formatNumber(totalConfirmed)} cases`}
          </p>
        </div>
      </div>
      <section className="Home-stats">
        <h5 className="App-section-title">STATS By COUNTRY</h5>
        <Grid items={items} />
      </section>
    </section>
  );
};

export default Home;
