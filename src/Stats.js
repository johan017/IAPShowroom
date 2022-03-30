import useFetch from "./useFetch";

const Stats = (props) => {

    const {data:stats, isLoading, error} = useFetch('http://localhost:8000/stats');
 
    return ( 
        <div>
            {error && <div> {error} </div>}
            {isLoading && <div> Loading...</div>}
            <div className="statsdate" style={{ borderBottom: '1px solid #8e8a8a' }} >
                <h2> Conference Stats </h2>  <h3>March 23, 2022</h3>
            </div>
          
            <div className="stats">
            {stats && stats.map((stat) =>(
            // Project list for schedule view in Lobby 
                <div key ={stat.id}>
                    <h3>Overall Participants</h3>

                    <text>Total Max Participants: {stat.maxParticipants} </text> 
                    <text>Total Active Participants: {stat.activeParticipants}</text>
                    <text>General Participants:{stat.generalParticipants} </text>
                    <text>Research Student Participants: {stat.researchStudParticipants} </text>
                    <text>Company Representatives Participants: {stat.companyRepParticipants}</text>
                    <text>Professor Participants: {stat.professorParticipants}</text>          

                    <text>Women: {stat.totalWomen} </text>
                    <text>Men: {stat.totalMen}</text>
                    <text>Not Disclosed: {stat.totalNotDisclosed}</text>


                    <h3>Project Research Students</h3>
                    <text>Research Student Participants: {stat.researchStudParticipants} </text>

                    <text>Research Students from ICOM: {stat.resStudICOM} </text>
                    <text>Research Students from INEL: {stat.resStudINEL} </text>
                    
                    <text>Current Grad Students:{stat.resStudGRAD} </text>


                    <text>Women: {stat.totalResStudWomen} </text>
                    <text>Men: {stat.totalResStudMen}</text>
                    <text>Not Disclosed: {stat.totalResStudNotDisclosed}</text>

                </div>
            ))}
            </div>
        </div>

    );
}
 
export default Stats;