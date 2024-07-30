import React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  type?: 'button' | 'submit' | 'reset'; 
}
