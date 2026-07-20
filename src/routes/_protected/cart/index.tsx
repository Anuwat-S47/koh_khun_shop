import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/cart/indexs"!</div>
}
