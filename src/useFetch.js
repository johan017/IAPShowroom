import { useState, useEffect } from "react";

const useFetch = (url) => {
  
  //projects, setProjects
    const [data, setData] = useState(null);
    // To manage wait time while page uploads
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
  
    // Fire a function that has to run in every re-render (can be used to fetch information)

    useEffect(() => {

        const abortCtrl = new AbortController();


        setTimeout(() => { // setTimeout is for testing purposes, simulates functional loading time; delete for deployment
          fetch(url, {signal: abortCtrl.signal}) /*endpoint in fetch()*/
              .then(res =>{
                  console.log(res);
                  if(!res.ok){ //response coming from page is false - there is an error
                      throw Error('Cant fetch data for that resource');
                  }
                  return res.json();
              })
              .then(data => {
                  // console.log(data);
                  setData(data);
                  setIsLoading(false);
                  setError(null);
              }) 
              //catch any kind of networks errors (e.g. not being able to conect to server)
              .catch(error =>{
                  if(error.name === 'AbortError'){
                      console.log('fetch aborted');
                  }else{
                    setError(error.message);
                    setIsLoading(false);
                  }
              })
        }, 1000);

        return () => abortCtrl.abort();
      }, [url]);   // Dependency array [dependency] in this case only runs with 1st render, information inside runs if dependency changes

    return {data, isLoading, error}

}


export default useFetch;