import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  userPoints: number | null;
  userAccessToken: string | null;
  setUser: (id: string, points: number, accessToken: string) => void;
  setUserPoints: (points: number) => void;
  setUserAccessToken: (accessToken: string) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  userPoints: null,
  userAccessToken: null,
  setUser: () => {},
  setUserPoints: () => {},
  setUserAccessToken: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const getUserId = () => {
    return localStorage.getItem("userId");
  }

  const getUserPoints = (): number | null => {
    const storedPoints = localStorage.getItem("userPoints");
    if (storedPoints) return Number(storedPoints);
    return null;
  }

  const getUserAccessToken = () => {
    return localStorage.getItem("userAccessToken");
  }

  const [userId, setUserId] = useState<string | null>(getUserId);
  const [userPoints, setUserPoints] = useState<number | null>(getUserPoints);
  const [userAccessToken, setUserAccessToken] = useState<string | null>(getUserAccessToken);

  const setUser = (id: string, points: number, accessToken: string) => {
    setUserId(id);
    setUserPoints(points);
    setUserAccessToken(accessToken);
    localStorage.setItem("userId", id);
    localStorage.setItem("userPoints", String(points));
    localStorage.setItem("userAccessToken", accessToken);
  };

  return (
    <UserContext.Provider value={{ 
        userId, userPoints, userAccessToken, 
        setUser, setUserPoints, setUserAccessToken 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
