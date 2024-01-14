import { useState } from "react";

type UseDisclosureReturn = [boolean, () => void, () => void];

export function useDisclosure(): UseDisclosureReturn {
  const [isOpen, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return [isOpen, onClose, onOpen];
}
