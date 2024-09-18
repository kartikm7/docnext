"use client"

import React, { ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { routes, RouteType } from "@/routes"

function RouteItem({ route, level = 0 }: { route: RouteType; level?: number }) {
  const pathname = usePathname()
  const isActive = pathname === route.path || pathname.startsWith(route.path + "/")



  return (
    <div>
      {route.children ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={route.path} className="border-none">
          <Link href={route.path}>
            <AccordionTrigger
              className={cn(
                "flex items-center justify-between py-2 text-sm opacity-50 hover:opacity-100 cursor-pointer",
                isActive && "opacity-100 font-medium"
              )}
            >
                {route.name}
            </AccordionTrigger>
            </Link>
             <AccordionContent>
              <div className="border-l-2 pl-4">
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
            "flex items-center gap-2 py-2 text-sm opacity-50 hover:opacity-100 w-fit",
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

export default function Sidebar({className, ...props}:ComponentProps<'aside'>) {
  return (
    <aside className={cn(className,"bg-background border-r-2 h-screen overflow-y-auto w-64")} {...props}>
      <div className="p-8">
        {routes.map((route) => (
          <RouteItem key={route.path} route={route} />
        ))}
      </div>
    </aside>
  )
}