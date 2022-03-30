import useFetch from "./useFetch";


const Sponsors = () => {

    const {data: uploads, error, isLoading} = useFetch('http://localhost:8000/uploads'); /* data is project because we want the id of a singular project */

    return ( 
        <div className="sponsors">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {/* <h2> SPONSORS </h2> */}
            <h1>Thank You to Our Sponsors</h1>

            {uploads && uploads.map((upload) =>(
            // Project list for schedule view in Lobby 
            <div className="logo-preview" key ={upload.upload_id}>
               <img
                src = {upload.upload_location}
                alt="display image"
                />
            </div>
            
        ))}

        </div>

    );
}
 
export default Sponsors;