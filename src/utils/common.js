import { useState, useEffect } from "react";

export function useWindowSize() {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  function handleResize() {
    setWindowSize({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    });
  }

  useEffect(() => {
    if (!isClient) {
      console.error("no client");
    } else {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient]);

  return windowSize;
}

export function useMobile() {
  return (useWindowSize()?.width || 0) <= 700;
}
