import { useState, useEffect } from 'react';
import axios from 'axios';
import { OutlinedInput, InputAdornment, FormControl, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Card from '../../components/Card/Card';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const history = useHistory();

  const [eventsSoon, setEventsSoon] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  // const [wordEntered, setWordEntered] = useState('');

  useEffect(() => {
    const getApi = async () => {
      await axios
        .get('https://timcevent.herokuapp.com/events/home')
        .then(function (response) {
          setEventsSoon(response.data.dataStarted.slice(0, 4));
          //console.log(getEventsSoon);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // const getEventsCategory = async () => {
    //   try {
    //     const res = await axios.get(`https://timcevent.herokuapp.com/events`);
    //     setFilteredData(res.data.events);
    //     console.log(res.data.events);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    getApi();
    // getEventsCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = filteredData.filter((value) => {
  //     return value.title.toLowerCase().includes(searchWord.toLowerCase());
  //   });
  //   setFilteredData(newFilter)
  // };

  return (
    <>
      <div className="container-header">
        <div className="header">
          <div className="header-wrapper">
            <h1 className="header-heading">
              <span>Create</span> or <span>Find</span> interesting <span>Events</span> around The World
            </h1>
            <FormControl sx={{ marginBottom: '2em', width: '60%' }}>
              <OutlinedInput
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment>
                    <Button variant="contained" sx={{ textTransform: 'unset', backgroundColor: '#214457', borderRadius: 10 }} placeholder="Search">
                      Search
                    </Button>
                  </InputAdornment>
                }
                placeholder="Search events"
                // value={wordEntered}
                // onChange={handleFilter}
                sx={{ borderRadius: 10, backgroundColor: '#F0F0F1' }}
              />
              {/* {filteredData.length !== 0 && (
                <div className="dataResult">
                  {filteredData.map((value, key) => {
                    return (
                      <a className="dataItem" href={`/detail/${value.id}`} target="_blank">
                        <p>{value.title} </p>
                      </a>
                    );
                  })}
                </div>
              )} */}
            </FormControl>
          </div>
        </div>
      </div>
      <div className="container-content">
        <div className="content">
          <div className="content-wrapper">
            <div className="content-heading">
              <h1>Attend an event starting soon</h1>
              <p onClick={() => history.push('/search')}>more events</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "98px", justifyContent:"space-between", marginRight: '98px' }}>
            {eventsSoon && eventsSoon.map((item) =>
            <Link to={`/detail/${item.id}`}  >
              <div className="content-card"> <Card image={item.photoEvent} category={item.category.name} date={item.dateStart} title={item.title} author={item.speakerName} /></div>
            </Link>)}
            </div>
          </div>
          <div className="content-wrapper">
            <div className="content-heading">
              <h1>Design events</h1>
              <p onClick={() => history.push('/search/ ')}>more events</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"space-between", marginLeft: "98px", marginRight: '98px' }}>
            {eventsSoon && eventsSoon.map((item) =>
            <Link to={`/detail/${item.id}`}  >
              <div className="content-card"> <Card image={item.photoEvent} category={item.category.name} date={item.dateStart} title={item.title} author={item.speakerName} /></div>
            </Link>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
