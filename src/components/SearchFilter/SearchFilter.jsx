import { Container, Typography, Stack } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
// import CantFind from "./CantFind/CantFind";
import CategoryFilter from "./Category/CategoryFilter";
import FilterDate from "./Date/DateFilter";
// import PageContent from "./PageContent/PageContent";
// import SortFilter from "./Sorting By/SortFilter";


const SearchFilter = () => {



    return (
        <>
        <CssBaseline />
        <Container maxWidth="lg" sx={{marginTop: '64px', }}>
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '20px',
                fontFamily: 'Noto Sans',
            }}> 
                Showing Results
            </Typography>

            {/* filter date, category, sort by.. */}
            <Stack direction="row" spacing={3} sx={{marginTop: '24px'}}>

                {/* filter by date */}
                <FilterDate/>

                {/* filter by category */}
                <CategoryFilter/>

                {/* sorting by..  */}
                {/* <SortFilter/> */}

                
            </Stack>

            {/* <CantFind/> */}

            {/* <PageContent/> */}
        </Container>
      </>
    )
}
export default SearchFilter