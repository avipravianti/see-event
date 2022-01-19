import { Container, CssBaseline, Grid } from "@mui/material"
import { useParams } from "react-router";
import {useState,useEffect} from 'react'
import axios from 'axios'
import DetailsSection from '../components/EventDetail/Section/DetailsSection'
import CommentsSection from "../components/EventDetail/Section/CommentsSection";
import HeaderEvent from "../components/EventDetail/Header/HeaderEvent";
import HeaderPhoto from "../components/EventDetail/Header/HeaderPhoto";
import CreatedbySection from "../components/EventDetail/Section/CreatedbySection";

const Detail = () => {
  const {id} = useParams();
  const [dataDetail, setDataDetail] = useState()
  // const { location } = history;
  // const { pathname } = location;
  // console.log(history);
  // console.log(pathname)
  
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://timcevent.herokuapp.com/events/${id}`, {
          headers: {
            token,
          },
        })
        setDataDetail(res.data.data)
        console.log(res.data.data)
  
      } catch (error) {
        console.log(error)
      }
    }
    if(id){
      fetchDetail()
    }
  }, [id])

  return (
    <> 
        <CssBaseline />
        <Container maxWidth="md" sx={{marginTop: '64px'}}>

            {/* headers */}
            <HeaderEvent {...dataDetail}/>
            <HeaderPhoto {...dataDetail}/>
          
            <Grid container spacing={2}
                sx={{marginTop: '31px'}}>
                {/* detail section */}
                <DetailsSection {...dataDetail}/>

                {/* section 'created by' */}
                <CreatedbySection {...dataDetail}/>
            </Grid>

                {/* section Comments */}
                <div>
                 
                <CommentsSection />
                </div>
                
                     
                
          
        </Container>
       </> 
  );
};
export default Detail;
