import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import useFetchSponsors from "./hooks/use-fetch-sponsors";


const Sponsors = () => {
    const {id}=useParams();
    const {sponsors} = useFetchSponsors();

    return ( 
        <div className="sponsors">
            <>
            <h1>Thank You to Our Sponsors</h1>
            <Grid container item spacing={6} justifyContent="center" alignContent="center">
                {sponsors && sponsors.map((sponsor) =>(
                    <Grid item xs="auto" key ={sponsor.sponsor_id}>
                        {sponsor.company_url !== null && (
                        <img
                            height={100}
                            width={400}
                            src = {sponsor.company_url}
                            alt="display image"
                        />
                        )} 
                    </Grid>
                ))} 
            </Grid>        
            </>
        </div>
    );
}
 
export default Sponsors;