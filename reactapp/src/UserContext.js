import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    appUser: null,
    setAppUser: () => {},
  });

function UserProvider({ children }) {

    const [appUser, setAppUser] = useState(() => {

        const appUser = localStorage.getItem("userModel");
        return appUser ? JSON.parse(appUser) : null;
    });
    useEffect(() => {
        localStorage.setItem("userModel", JSON.stringify(appUser));
      }, [appUser]);



    console.log("new user", appUser);
    return (
        <UserContext.Provider value={{ appUser, setAppUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
export { UserProvider };