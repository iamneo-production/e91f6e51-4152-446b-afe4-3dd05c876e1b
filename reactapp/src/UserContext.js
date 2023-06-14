import { createContext,useState } from "react";

const UserContext = createContext({
    appUser: null,
    setAppUser: () => {},
});

function UserProvider({children}){
    
    const [appUser, setAppUser] = useState(null);
    console.log("new user",appUser);
    return (
        <UserContext.Provider value={{appUser,setAppUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
export {UserProvider} ;