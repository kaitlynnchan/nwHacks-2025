import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  userPoints: number | null;
  setUser: (id: string, points: number) => void;
  setUserPoints: (points: number) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  userPoints: null,
  setUser: () => {},
  setUserPoints: () => {},
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

  const [userId, setUserId] = useState<string | null>(getUserId);
  const [userPoints, setUserPoints] = useState<number | null>(getUserPoints);

  const setUser = (id: string, points: number) => {
    setUserId(id);
    setUserPoints(points);
    localStorage.setItem("userId", id);
    localStorage.setItem("userPoints", String(points));
  };

  return (
    <UserContext.Provider value={{ userId, userPoints, setUser, setUserPoints }}>
      {children}
    </UserContext.Provider>
  );
};
