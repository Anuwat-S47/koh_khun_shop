import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/shop/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/shop/"!</div>
}
