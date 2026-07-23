import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetShop } from "@/features/shop/hooks/useShop";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/shop/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: shop, isLoading } = useGetShop();
  console.log(shop);

  if (isLoading) return <Skeleton />;

  return (
    <div>
      {shop && shop.length > 0 ? (
        shop.map((s) => (
          <div key={s.id}>
            <img
              src={s.logo_url}
              alt={`โลโก้ ${s.name}`}
              className="h-32 w-32 rounded-lg object-cover"
            />

            <h2>{s.name}</h2>
            <p>{s.address}</p>
          </div>
        ))
      ) : (
        <div>
          <Link to="/settings/shop/add-shop">
            <Button variant={"ghost"}>เพิ่มร้าน</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
