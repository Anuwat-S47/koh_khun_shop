import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/product/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/product/"!</div>
}
