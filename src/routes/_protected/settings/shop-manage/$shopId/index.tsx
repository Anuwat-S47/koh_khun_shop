import { useTranslation } from "@/features/translations/hooks/useTranSlation";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopTableManager } from "@/features/shop-manage/components/ShopTableManager";

import { VerifyShop } from "@/features/shop-manage/service/shop-manage-api";
import { Utensils, UtensilsCrossed } from "lucide-react";
import { FoodAndTypeManager } from "@/components/FoodAndTypeManager";

type ShopManageSearch = {
  tab?: "table" | "food";
};

export const Route = createFileRoute(
  "/_protected/settings/shop-manage/$shopId/",
)({
  validateSearch: (search: Record<string, unknown>): ShopManageSearch => {
    return {
      tab: (search.tab as ShopManageSearch["tab"]) || "table",
    };
  },
  staticData: {
    title: "shop.manage",
    description: "shop.manageDescription",
    layoutClassName: "p-4 md:p-6 space-y-6 max-w-7xl mx-auto",
    className: "w-full",
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
  const search = useSearch({ from: "/_protected/settings/shop-manage/$shopId/" });
  const navigate = useNavigate({ from: Route.fullPath });
  const { t } = useTranslation();

  const currentTab = search.tab || "table";

  const handleTabChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, tab: value as ShopManageSearch["tab"] }),
      replace: true,
    });
  };

  return (
    <div className="w-full space-y-4">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-11 p-1 bg-slate-100 rounded-xl">
          <TabsTrigger 
            value="table" 
            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-xs transition-all"
          >
            <Utensils className="w-4 h-4" />
            <span>{t.table.title}</span>
          </TabsTrigger>

          <TabsTrigger 
            value="food" 
            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-xs transition-all"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>{t.food.title}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-4 focus-visible:outline-none">
          <ShopTableManager shopId={Number(shopId)} />
        </TabsContent>

        <TabsContent value="food" className="mt-4 focus-visible:outline-none">
          <FoodAndTypeManager shopId={Number(shopId)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}