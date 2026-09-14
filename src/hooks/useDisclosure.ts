"use client";

import { useCallback, useState } from "react";

/** Shared open/close boolean state for menus, modals, and drawers. */
export function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

  return { isOpen, open, close, toggle };
}
