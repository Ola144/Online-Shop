import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>(undefined);

export const UserProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    let localUserId = localStorage.getItem("onlineShopUserId");
    if (localUserId != null) setUserId(JSON.parse(localUserId));

    const localUser = localStorage.getItem("onlineShopUsers");
    if (localUser != null) {
      setUsers(JSON.parse(localUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
