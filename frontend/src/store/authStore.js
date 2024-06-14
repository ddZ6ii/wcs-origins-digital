import { useCallback, useEffect, useState } from "react";
import { retrieveUserInfo } from "../services/users";
import isEmpty from "../utils/isEmpty";

const STORAGE_KEY = "user";

const initialAccount = {
  id_user: null,
  email: null,
  pseudo: null,
  role: null,
  id_plan: null,
  plan: null,
};

const initAccount = () => {
  const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  if (user) return { ...initialAccount, id_user: user.id };
  return initialAccount;
};

export default function authStore() {
  const [account, setAccount] = useState(initAccount);

  const isAdmin = account.role === 1;
  const isLoggedIn = !isEmpty(account.id_user);

  const updateAccount = useCallback((accountInfo) => {
    setAccount(accountInfo);
  }, []);

  const resetAccount = useCallback(() => {
    setAccount(initialAccount);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  // retrieve user info from backend using JWT stored in the cookie (in case of page refresh)
  useEffect(() => {
    const getuserInfo = async () => {
      const { data: accountInfo } = await retrieveUserInfo(account.id_user);
      setAccount(accountInfo);
    };
    if (account.id_user) getuserInfo();
  }, []);

  // store user id in session storage to retrieve user info
  useEffect(() => {
    const { id_user: userId } = account;
    if (userId)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: userId }));
  }, [account.id_user]);

  return {
    account,
    isAdmin,
    isLoggedIn,
    updateAccount,
    resetAccount,
  };
}
