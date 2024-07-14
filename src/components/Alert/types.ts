import React from "react"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "danger"
  leadingIcon?: React.ReactNode
  children: React.ReactNode
}
