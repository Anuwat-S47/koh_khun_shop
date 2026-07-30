import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/shop/$shopId/")({
  staticData: {
    title: "จัดการร้านค้า",
    description: "เพิ่มประเภทสินค้า, สินค้า, ประเภทโต๊ะ, หรือ อื่นๆ",
    showBackButton: true,
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { shopId } = Route.useParams();
  console.log(shopId);
  return (
    <div>
      <h1>Hello /_protected/settings/shop/{shopId}/!</h1>
    </div>
  );
}
