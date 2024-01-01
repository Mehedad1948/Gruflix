import { useState } from "react";

function useLocalStorage(key: string, initialValue: string | number) {
  // Check if local storage is available in the browser
  const isLocalStorageAvailable = typeof Storage !== "undefined";

  // Initialize the state with the value from local storage, if available
  const [storedValue, setStoredValue] = useState(() => {
    if (!isLocalStorageAvailable) {
      console.warn("Local storage is not available in this browser.");
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return initialValue;
    }
  });

  // Define a function to update the state and save the value to local storage
  const setValue = (value: Function | string | number) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error storing data in local storage:", error);
    }
  };

  // Return the state value and the function to update it
  return [storedValue, setValue];
}

export default useLocalStorage;
