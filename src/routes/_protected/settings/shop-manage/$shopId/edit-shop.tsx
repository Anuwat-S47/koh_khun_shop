import { createFileRoute } from "@tanstack/react-router";
import { useGetShopById } from "@/features/shop-manage/hooks/useShopManage";
import EditShopForm from "@/features/shop-manage/components/EditShopForm";

export const Route = createFileRoute(
  "/_protected/settings/shop-manage/$shopId/edit-shop",
)({
  staticData: {
    title: "shop.editShop",
    showBackButton: true,
    className: "w-full max-w-2xl border-2 p-4 rounded-2xl",
  },
  component: EditShopPage,
});

function EditShopPage() {
  const { shopId } = Route.useParams();

  const { data: shop, isPending, error } = useGetShopById(Number(shopId));

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error || !shop) {
    return <div>ไม่พบข้อมูลร้าน</div>;
  }

  return (
    <div>
      <EditShopForm key={shop.id} shop={shop} />
    </div>
  );
}
