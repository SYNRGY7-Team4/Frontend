import React from "react"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "danger"
  children: React.ReactNode
}
