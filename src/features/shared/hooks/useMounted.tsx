import { useEffect, useRef } from "react";

function useMounted () {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    }
  }, []);

  return {
    isMounted
  }
}

export default useMounted;