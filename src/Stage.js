const Stage = () => {
    return ( 
        <body>
            <br></br>
            <h2> STAGE </h2>
            <div className="bbb">
                {/* Update to get src url from the backend. Temporarily Hardcoded to get a view working  */}
                <iframe className="temp" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/create?name=DemoMeeting&meetingID=DemoMeeting&attendeePW=ap&moderatorPW=mp&checksum=f5e85d6b55189f228cf06e4791736e44b63282f1"></iframe> {/* TODO Remove after changes to incorporate backend url */}
                
                <iframe className="iframe" src="https://iapstream.ece.uprm.edu/bigbluebutton/api/join?fullName=w1&meetingID=DemoMeeting&password=mp&role=moderator&checksum=62dcc9207e6fbaef56223b4f4b0dcd5abcad159e" allow="camera;microphone;display-capture;fullscreen"></iframe> 
            </div>
        </body>

    );
}
 
export default Stage;