import React from 'react'
import pic from '/home/coder/project/workspace/reactapp/src/404 error.png';
const PageNotFound=()=>{
    return(
        <div>
        <img src={pic} alt="ERROR"/>
             <div>
             <center>
                <h2>Page Not Found 404 Error</h2>
                <p>Please check the url (Page not found)</p>
             </center>
            </div>
        </div>
    )
}
//echo fs.inotify.max_user_watches= 131070 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

export default PageNotFound