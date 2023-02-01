import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { XIcon } from "@heroicons/react/outline";

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  hasCloseButton?: boolean;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
  trigger,
  children,
  hasCloseButton,
  title,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Close asChild>
          <RadixDialog.Overlay className="bg-prim-900/50 fixed inset-0 z-40" />
        </RadixDialog.Close>
        <div className="bg-white rounded-md shadow-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 max-w-4xl z-50">
          <div className="flex justify-between pb-3">
            <h1 className="modal-title">{title}</h1>
            {hasCloseButton ? (
              <RadixDialog.Close asChild>
                <button aria-label="Close">
                  <XIcon className="h-5 w-6" />
                </button>
              </RadixDialog.Close>
            ) : null}
          </div>
          {children}
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
