export type RouteType = {
  name: string
  path: string
  icon?: React.ReactNode
  children?: RouteType[]
}

export const routes: RouteType[] = [
  {
    name: "Introduction",
    path: "/docs",
    children: [
      {
        name: "Quick Setup",
        path: "/docs/quick-setup"
      },
      {
        name: "Make your first change",
        path: "/docs/first-change"
      }
    ]
  },
  {
    name: "Routing",
    path: "/docs/routing"
  },
  {
    name: "Deploy",
    path: "/docs/deploy",
  }
]