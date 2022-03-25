import useFetch from "./useFetch";
import LogoList from "./LogoList";


const Sponsors = () => {

    const {data: logos, error, isLoading} = useFetch('http://localhost:8000/logos'); /* data is project because we want the id of a singular project */

    return ( 
        <div className="sponsors">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {/* <h2> SPONSORS </h2> */}
            <h1>Thank You to Our Sponsors</h1>

            {logos && <LogoList logos={logos} ></LogoList>}

        </div>

    );
}
 
export default Sponsors;