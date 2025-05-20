import { useEffect, useState } from "react";
import { getStoredToken, getStoredUser } from "@/utils/authStorage";
import { useUserStore } from "@/stores/useUserStore";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, jwt, login } = useUserStore();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedToken = await getStoredToken();
        const storedUser = await getStoredUser();
        if (storedToken && storedUser) {
          login(storedUser, storedToken);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [login]);
  return {
    isLoading,
    isAuthenticated: !!jwt && !!user,
  };
}
