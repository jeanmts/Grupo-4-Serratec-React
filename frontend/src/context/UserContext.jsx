import { createContext, useState } from "react";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const user = localStorage.getItem("userName")
  const [userName, setUserName] = useState(user);
  return (
    <UserContext.Provider value={{ userName, setUserName}}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;