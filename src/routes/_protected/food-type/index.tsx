import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/food-type/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/food-type/"!</div>
}
