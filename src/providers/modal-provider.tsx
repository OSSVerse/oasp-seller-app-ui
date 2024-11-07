import ChangePasswordModal from "@/components/modals/chnage-password-modal";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import Drawer from "@/components/modals/drawer";
import { useState, useEffect } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ConfirmationModal />
      <ChangePasswordModal />
      <Drawer />
    </>
  );
};

export default ModalProvider;
