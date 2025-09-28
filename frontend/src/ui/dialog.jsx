import * as React from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";

const Dialog = ({ isOpen, onClose, children }) => (
  <HeadlessDialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <HeadlessDialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      {children}
    </HeadlessDialog.Panel>
  </HeadlessDialog>
);

export { Dialog };
