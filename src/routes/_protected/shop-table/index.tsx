import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/shop-table/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/shop-table/"!</div>
}
