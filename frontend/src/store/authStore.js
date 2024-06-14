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

export default function authStore() {
  const [account, setAccount] = useState(initialAccount);

  const isAdmin = account.role === 1;
  const isLoggedIn = !isEmpty(account.id_user);

  const updateAccount = useCallback((accountInfo) => {
    setAccount(accountInfo);
  }, []);

  const resetAccount = useCallback(() => {
    setAccount(initialAccount);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const getuserInfo = async (userId) => {
    try {
      const { data: accountInfo } = await retrieveUserInfo(userId);
      setAccount(accountInfo);
    } catch (err) {
      console.error(err);
      // if cookie is removed, reset local storage info to automatically logout the user
      if (err.response.status === 401) setAccount(initialAccount);
    }
  };

  // retrieve user info from backend using JWT stored in the cookie (in case of page refresh)
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (!isEmpty(user)) getuserInfo(user.id);
  }, []);

  // store user id in session storage to retrieve user info
  useEffect(() => {
    const { id_user: userId } = account;
    if (userId) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: userId }));
    }
  }, [account.id_user]);

  return {
    account,
    isAdmin,
    isLoggedIn,
    updateAccount,
    resetAccount,
  };
}
