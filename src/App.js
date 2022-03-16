import Navbar from './Navbar';
import Home from './Home';

function App() {

  // const likes = 100;
  // const FEAV = "https://drive.google.com/file/d/1Oa8CutI95VZUt05YpeYBVMcgKLhpjGsx/view?usp=sharing";


  return (
      <div className="App"> 
      <Navbar></Navbar> {/*Navigation bar*/}
        <div className="content">
            <Home></Home> {/*Home component*/}
                 
          {/* <p> Liked {likes} times </p>
        </div>
        {/* to create a clickable link (like in documents) */}
        </div>
        {/*<a href={FEAV}>FRONT END ADMIN VIEW</a>  */}
      </div>
  );
}

export default App;
