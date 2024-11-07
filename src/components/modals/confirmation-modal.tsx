"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useModal } from "@/store/modal-store";

const ConfirmationModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "confirmationDialog";

  const content = data?.confirmationDialog?.content;
  const closeLabel = data?.confirmationDialog?.closeLabel ?? "Cancel";
  const confirmLabel = data?.confirmationDialog?.confirmLabel ?? "Confirm";

  const isString = (value: string | React.ReactNode): value is string =>
    typeof value === "string";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="">
            {data?.confirmationDialog?.title}
          </DialogTitle>
          {isString(content) ? (
            <DialogDescription className=" ">{content}</DialogDescription>
          ) : (
            content
          )}
        </DialogHeader>
        <DialogFooter className=" px-6 py-4 flex justify-end gap-2">
          {data?.confirmationDialog?.onClose && (
            <Button
              onClick={data?.confirmationDialog?.onClose ?? onClose}
              variant={"ghost"}
            >
              {closeLabel}
            </Button>
          )}
          {data?.confirmationDialog?.onConfirm && (
            <Button
              onClick={data?.confirmationDialog?.onConfirm}
              variant={"default"}
            >
              {confirmLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
