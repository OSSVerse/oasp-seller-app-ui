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

const Drawer = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "drawer";

  const content = data?.drawer?.content;
  const closeLabel = data?.drawer?.closeLabel ?? "Cancel";
  const confirmLabel = data?.drawer?.confirmLabel ?? "Submit";
  const showFooter = data?.drawer?.showFooter ?? true;

  const isString = (value: string | React.ReactNode): value is string =>
    typeof value === "string";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          p-0
          overflow-hidden 
          absolute
          top-0
          right-0
          bottom-0
          translate-y-0
          translate-x-0
          flex
          flex-col
          justify-between
          h-screen

          data-[state=open]:animate-in
          data-[state=closed]:animate-out

          data-[state=closed]:fade-out-100
          data-[state=open]:fade-in-100

          data-[state=closed]:zoom-out-100
          data-[state=open]:zoom-in-100

          data-[state=closed]:slide-out-to-right-full
          data-[state=closed]:slide-out-to-top-0

          data-[state=open]:slide-in-from-right-full
          data-[state=open]:slide-in-from-top-0
          
          sm:rounded-none
        "
      >
        <DialogHeader className="pt-8 px-6 border-b border-b-gray-300">
          <DialogTitle className="pb-6 ">{data?.drawer?.title}</DialogTitle>
        </DialogHeader>
        {isString(content) ? (
          <DialogDescription>{content}</DialogDescription>
        ) : (
          <div className="overflow-auto  py-4 mx-4 mb-auto">{content}</div>
        )}
        {showFooter && (
          <DialogFooter className="px-6 py-4 flex sm:justify-start gap-2 border-t border-b-gray-300">
            <Button
              onClick={data?.drawer?.onClose ?? onClose}
              variant={"ghost"}
            >
              {closeLabel}
            </Button>
            <Button onClick={data?.drawer?.onConfirm} variant={"default"}>
              {confirmLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Drawer;
