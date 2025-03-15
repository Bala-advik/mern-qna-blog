import { useState } from "react";

export const useLocaIStorage = (key: any, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setltem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
      return [storedValue, setValue];
    }
  };
};
