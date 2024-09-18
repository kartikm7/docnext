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