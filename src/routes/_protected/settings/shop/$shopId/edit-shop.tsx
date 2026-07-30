import { createFileRoute } from "@tanstack/react-router";
import { useGetShopById } from "@/features/shop/hooks/useShop";
import EditShopForm from "@/features/shop/components/EditShopForm";

export const Route = createFileRoute(
  "/_protected/settings/shop/$shopId/edit-shop",
)({
  staticData: {
    title: "แก้ไขข้อมูลร้านค้า",
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
