"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Brief "added" state for add-to-cart buttons (drives the confirm animation). */
export function useAdded(ms = 1400) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const flash = useCallback(() => {
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), ms);
  }, [ms]);
  return [added, flash] as const;
}
