import { useHistory } from "react-router-dom";


const AccountCreated = () => {

    const history = useHistory();
    const page = 4;

    const handleOK = (e) =>{
        e.preventDefault();
        history.push('/home');
    }

    return (    
        <div className="account-created">
            <img 
                style={{width:'250px', height:'100px'}}
                src = "IAP_Showroom_Logo_HD_Big.png"
                alt="display image"
            />
        

            <div className="generalInfoSignUp">
                
            
                <div>
                    <h2>Account Created!</h2>
                    {page !== 4 && <progress max="4" value={page}/>}
                    {page === 4 && <progress style={{background: 'green'}} max="4" value={page}/>}
                </div>


                <h1>A Verification link has been sent to your email account</h1>
                <p>
                Please click on the link that has just been sent to your email account to verify your email. 
                This will provide you the ability to interact in the conference. 
                Other wise you will only be permitted to view and hear the conference.
                
                </p>
            
                <button style={{ background: '#008DED' }} onClick={handleOK}> OK </button>

            </div>
        </div>

    );
}
 
export default AccountCreated;