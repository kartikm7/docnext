"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"

export type RouteType = {
  name: string
  path: string
  icon?: React.ReactNode
  children?: RouteType[]
}

export const routes: RouteType[] = [
  {
    name: "Getting started",
    path: "/docs",
    children: [
      {
        name: "Quick Setup",
        path: "/docs/quick-setup"
      },
      {
        name: "How to make changes?",
        path: "/docs/first-change"
      }
    ]
  },
  {
    name: "Deploy",
    path: "/docs/deploy",
  }
]

function RouteItem({ route, level = 0 }: { route: RouteType; level?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const isActive = pathname === route.path || pathname.startsWith(route.path + "/")

  React.useEffect(() => {
    if (isActive) {
      setOpen(true)
    }
  }, [isActive])

  const handleClick = () => {
    if (route.children) {
      setOpen(!open)
    }
  }

  return (
    <div>
      {route.children ? (
        <Accordion type="single" collapsible value={open ? route.path : ""}>
          <AccordionItem value={route.path} className="border-none">
            <div
              className={cn(
                "flex items-center justify-between py-2 px-4 text-sm opacity-50 hover:opacity-100 cursor-pointer",
                isActive && "opacity-100 font-medium"
              )}
              onClick={handleClick}
            >
              <div className="flex items-center gap-2">
                {route.icon}
                {route.name}
              </div>
              <ChevronRightIcon className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />
            </div>
            <AccordionContent>
              <div className="pl-4">
                {route.children.map((childRoute) => (
                  <RouteItem key={childRoute.path} route={childRoute} level={level + 1} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          href={route.path}
          className={cn(
            "flex items-center gap-2 py-2 px-4 text-sm opacity-50 hover:opacity-100",
            isActive && "opacity-100 font-medium"
          )}
        >
          {route.icon}
          {route.name}
        </Link>
      )}
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="bg-background border-r-2 h-screen overflow-y-auto">
      <div className="p-8">
        {routes.map((route) => (
          <RouteItem key={route.path} route={route} />
        ))}
      </div>
    </aside>
  )
}