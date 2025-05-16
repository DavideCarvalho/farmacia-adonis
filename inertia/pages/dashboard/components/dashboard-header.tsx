import type React from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Hoje
        </Button>
        {children}
      </div>
    </div>
  )
}
