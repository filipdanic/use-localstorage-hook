import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue, useRawValues, subscribe) => {
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

  useEffect(() => {
    if (!subscribe) {
      return;
    }

    function handleStorageEvent(event) {
      if (event.key !== key) {
        return;
      }

      setValue(useRawValues ? event.newValue : JSON.parse(event.newValue || 'null'));
    }

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [subscribe])

  return [ value, setValue ];
};

export default useLocalStorage;
