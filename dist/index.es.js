import { useState, useEffect } from 'react';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var useLocalStorage = function useLocalStorage(key, initialValue, useRawValues, subscribe) {
  var _useState = useState(function () {
    try {
      var localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(key, useRawValues ? String(initialValue) : JSON.stringify(initialValue));
        return initialValue;
      } else {
        return useRawValues ? localStorageValue : JSON.parse(localStorageValue || 'null');
      }
    } catch (e) {
      return initialValue;
    }
  }),
      _useState2 = slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  useEffect(function () {
    try {
      var serializedState = useRawValues ? String(value) : JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (e) {}
  });

  useEffect(function () {
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

    return function () {
      window.removeEventListener('storage', handleStorageEvent);
    };
  });

  return [value, setValue];
};

export default useLocalStorage;
//# sourceMappingURL=index.es.js.map
