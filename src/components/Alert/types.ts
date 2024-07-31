import React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "danger" | "primary";
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  autoDismiss?: boolean;
  showCloseButton: boolean;
}
