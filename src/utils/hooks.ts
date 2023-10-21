import { useEffect, useRef, useState } from "react";

export const usePreviousValue = (value: any) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useStateWithRef = (initialValue: any) => {
  const ref = useRef(initialValue);
  const [state, setState] = useState(initialValue);

  const updateState = (newState: any) => {
    ref.current = typeof newState === "function" ? newState(state) : newState;
    setState(ref.current);
  };

  return [state, updateState, ref];
};
