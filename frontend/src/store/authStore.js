import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "account";

const initialAccount = { id_plan: undefined };

const initAccount = () => {
  const accountInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return accountInfo ?? initialAccount;
};

const getAuthStatus = (planId) => {
  if (planId === undefined) return "unknown";
  if (planId === null || planId === 1 || planId === 3) return "authenticated";
  return "guest";
};

export default function authStore() {
  const [account, setAccount] = useState(initAccount);

  const updateAccount = useCallback((userInfo) => {
    setAccount(userInfo);
  }, []);

  const resetAccount = useCallback(() => {
    setAccount(initialAccount);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const isAdmin = Boolean(account?.is_admin);
  const isLoggedIn = getAuthStatus(account.id_plan) === "authenticated";

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  }, [account]);

  return {
    account,
    isAdmin,
    isLoggedIn,
    updateAccount,
    resetAccount,
  };
}
