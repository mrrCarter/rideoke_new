import { createContext, useContext, useState } from "react";
// Temporarily commented out Firebase
// import { User } from "firebase/auth";
// import { auth } from "./firebase";

// Mock User type
type User = {
  email: string | null;
  uid: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // For testing, we'll use a mock user
  const [user] = useState<User | null>({ 
    email: "test@example.com",
    uid: "test-user-id"
  });
  const [loading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}