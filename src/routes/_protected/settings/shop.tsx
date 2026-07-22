import { Skeleton } from "@/components/ui/skeleton";
import { useGetShop } from "@/features/shop/hooks/useShop";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/shop")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: shop, isLoading } = useGetShop();

  console.log(shop);

  if (isLoading) return <Skeleton />;
  
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}
