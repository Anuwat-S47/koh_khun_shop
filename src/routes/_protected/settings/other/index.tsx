import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/settings/other/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/settings/other/"!</div>
}
