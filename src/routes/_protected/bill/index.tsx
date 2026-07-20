import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/bill/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/bill/"!</div>
}
