import CardSearch from '../components/CardSearch/CardSearch'
import { Stack, Container, CssBaseline } from '@mui/material'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchFilter from '../components/SearchFilter/SearchFilter';
// import PageContent from '../components/SearchFilter/PageContent/PageContent';

const Search = () => {

    const [event, setEvent] = useState([]);

    const getEvent = async () => {
        try {
            const res = await axios.get(`https://timcevent.herokuapp.com/events`);
            setEvent(res.data.events);
            console.log(res.data.events);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <>
        <CssBaseline />
        <Container maxWidth="xl" sx={{marginTop: '64px', }}>
        <SearchFilter/>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            display= "flex"
            flexWrap= "wrap"
            marginTop= '50px'
            
        >
            {event && event.map((item, key) => 
            <CardSearch 
                image={item.photoEvent} 
                category={item.category.name} 
                date={item.time} 
                title={item.title} 
                user={item.user.firstName}/>)}
        </Stack>
        {/* <PageContent/> */}
        </Container>
        </>
    )
}
export default Search