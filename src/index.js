import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue, useRawValues) => {
  const [ value, setValue ] = useState(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(
          key,
          useRawValues ? String(initialValue) : JSON.stringify(initialValue)
        );
        return initialValue;
      } else {
        return useRawValues ? localStorageValue : JSON.parse(localStorageValue || 'null');
      }
    } catch(e) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = useRawValues ? String(value) : JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch(e) {}
  });

  return [ value, setValue ];
};

export default useLocalStorage;
