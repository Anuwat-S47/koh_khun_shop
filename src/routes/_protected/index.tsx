import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/')({
    staticData: {
    showBackButton: false,
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello HomePage "/"!</div>
}
