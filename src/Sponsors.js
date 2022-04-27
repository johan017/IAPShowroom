import useFetch from "./useFetch";
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/upload";
import useFetchSponsors from "./hooks/use-fetch-sponsors";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

const Sponsors = () => {
    const {id}=useParams();
    const {data: uploads, error, isLoading} = useFetch('http://localhost:8000/uploads'); /* data is project because we want the id of a singular project */
    const {sponsors} = useFetchSponsors();
    return ( 
        <div className="sponsors">
            {/* {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>} */}
            {/* <h2> SPONSORS </h2> */}
            {/* <h1>Thank You to Our Sponsors</h1> */}
            {/* <Grid container item spacing={3} >*/}
                {uploads && uploads.map((upload) =>(
                    <Grid item xs="auto" key ={upload.id}>
                        <Item> <img
                            height={100}
                            width={200}
                            src = {upload.upload_location}
                            alt="display image"
                        />
                        </Item>
                    </Grid>
                ))}
                        {/* <Grid item xs={10}>
                            <Item><h1>Thank You to Our Sponsors</h1></Item>
                        </Grid> */}
                        {/* <Grid item xs>
                            <Item>xs</Item>
                        </Grid>   *
                    </Grid>
                   
                ))}
                 <Grid item xs={10}>
                    <Item style={{fontSize:"60px", fontFamily:"Montserrat", color:"#000000"}}>Thank You to Our Sponsors</Item>
                 </Grid>
            </Grid>
                           
           */}

        </div>

    );
}
 
export default Sponsors;