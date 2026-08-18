import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopTableManager } from "@/features/shop-manage/components/ShopTableManager";

export const Route = createFileRoute(
  "/_protected/settings/shop-manage/$shopId/",
)({
  staticData: {
    title: "shop.manage",
    description: "shop.manageDescription",
    className: "w-full max-w-2xl",
    showBackButton: true,
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
        </TabsList>

        <TabsContent value="table" className="mt-4">
          <ShopTableManager shopId={Number(shopId)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
