import React from "react";
import styles from "/home/coder/project/workspace/reactapp/src/components/Customer/PageNotFound/PageNotFound.css";
import errorImage from "/home/coder/project/workspace/reactapp/src/404 error.png";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <img src={errorImage} alt="404 Error" className={styles.errorImage} />
      <h1 className={styles.errorTitle}>Oops! Page Not Found</h1>
      <p className={styles.errorMessage}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className={styles.errorLink}>
        Go to Homepage
      </a>
    </div>
  );
};

export default PageNotFound;

