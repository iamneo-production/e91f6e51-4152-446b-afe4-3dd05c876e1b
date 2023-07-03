import React from "react";
// import styles from "/home/coder/project/workspace/reactapp/src/components/Customer/PageNotFound/PageNotFound.css";
import errorImage from "/home/coder/project/workspace/reactapp/src/404_error.png";
import "./PageNotFound.css" 
// import Navbaar from "/home/coder/project/workspace/reactapp/src/components/Customer/Navbaar/Navbaar";
const PageNotFound = () => {
  return (
    <div>
 {/* <Navbaar/>  */}

    <div className='PNF'>
      

      {/* <img src={errorImage} alt="404 Error" className={styles.errorImage} />
      <h1 className={styles.errorTitle}>Oops! Page Not Found</h1>
      <p className={styles.errorMessage}>
        The page you're looking for doesn't exist or has been moved.
      </p>*/}
      <p >
      <center>
      <a href="/" className="errorLink">
        Login
      </a> 
      </center>
      </p>
    </div>
    </div>
  );
};

export default PageNotFound;

