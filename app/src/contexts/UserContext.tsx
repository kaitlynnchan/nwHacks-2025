import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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
  const [userId, setUserId] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedPoints = localStorage.getItem("userPoints");
    if (storedId) setUserId(storedId);
    if (storedPoints) setUserPoints(Number(storedPoints));
  }, []);

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
