import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopTableManager } from "@/features/shop-manage/components/ShopTableManager";
import { FoodTypeManager } from "@/features/food-type-manage/components/FoodTypeManager";
import { VerifyShop } from "@/features/shop-manage/service/shop-manage-api";
import { FoodManager } from "@/features/food-manage/components/FoodManager";

export const Route = createFileRoute(
  "/_protected/settings/shop-manage/$shopId/",
)({
  staticData: {
    title: "shop.manage",
    description: "shop.manageDescription",
    className: "w-full max-w-2xl",
    showBackButton: true,
  },
  beforeLoad: async ({ params }) => {
    const shopId = Number(params.shopId);

    if (!Number.isInteger(shopId) || shopId <= 0) {
      throw new Error("Invalid shop ID");
    }

    await VerifyShop(shopId);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { shopId } = Route.useParams();
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">{t.table.title}</TabsTrigger>
          <TabsTrigger value="food-type">{t.food.type}</TabsTrigger>
          <TabsTrigger value="food">{t.food.title}</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-4">
          <ShopTableManager shopId={Number(shopId)} />
        </TabsContent>

        <TabsContent value="food-type" className="mt-4">
          <FoodTypeManager shopId={Number(shopId)} />
        </TabsContent>

        <TabsContent value="food" className="mt-4">
          <FoodManager shopId={Number(shopId)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
