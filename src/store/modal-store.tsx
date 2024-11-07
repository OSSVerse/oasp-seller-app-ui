import { create } from "zustand";

export type ModalType = "confirmationDialog" | "drawer" | "changePassword";

interface ModalData {
  confirmationDialog?: {
    title: string;
    content: string | React.ReactNode;
    onConfirm?: () => void;
    onClose?: () => void;
    closeLabel?: string;
    confirmLabel?: string;
  };
  drawer?: {
    title: string;
    content: React.ReactNode;
    onConfirm?: () => void;
    onClose?: () => void;
    showFooter?: boolean;
    closeLabel?: string;
    confirmLabel?: string;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
