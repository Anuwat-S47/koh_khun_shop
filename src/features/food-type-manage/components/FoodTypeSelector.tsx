import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FoodType } from "../types/food_type_manage_type";

export function FoodTypeSelector({
  value,
  onChange,
  foodTypes,
  isLoading,
  t,
}: {
  value: number;
  onChange: (id: number) => void;
  foodTypes: FoodType[];
  isLoading: boolean;
  t: any;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialLimit = 4;
  const totalTypes = foodTypes?.length || 0;
  const hasMore = totalTypes > initialLimit;

  const visibleTypes = isExpanded
    ? foodTypes
    : foodTypes?.slice(0, initialLimit);

  const isSelectedHidden =
    !isExpanded &&
    value !== undefined &&
    value !== null &&
    !visibleTypes?.some((t) => t.id === value);

  const hiddenSelectedItem = isSelectedHidden
    ? foodTypes?.find((t) => t.id === value)
    : null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{t.foodType.title}</Label>
      </div>

      {isLoading ? (
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 w-20 bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2 transition-all">
          {visibleTypes?.map((type) => {
            const isSelected = value === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onChange(type.id)}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-lg border transition-all active:scale-95 ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/20"
                    : "bg-background border-input hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {type.name}
              </button>
            );
          })}

          {hiddenSelectedItem ? (
            <button
              type="button"
              onClick={() => onChange(hiddenSelectedItem.id)}
              className="text-sm font-medium px-3.5 py-1.5 rounded-lg border bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/20 active:scale-95 transition-all"
            >
              {hiddenSelectedItem.name}
            </button>
          ) : null}

          {hasMore ? (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium px-3 py-1.5 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 active:scale-95 transition-all flex items-center gap-1"
            >
              {isExpanded ? (
                <>ย่อลง ▴</>
              ) : (
                <>+{totalTypes - initialLimit} รายการเพิ่มเติม ▾</>
              )}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
