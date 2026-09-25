import ButtonBack from "@/components/ButtonBack";
import { PageLayoutProps } from "@/types/page-types";

export function PageLayout({
  children,
  title,
  description,
  action,
  showBackButton = true,
  className = "",
}: PageLayoutProps) {
  return (
    <div>
      <div className="space-y-3">
        {showBackButton && <ButtonBack />}

        {(title || action) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {title && (
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-sm text-slate-500 mt-1">{description}</p>
              )}
            </div>
            {action && <div className="flex items-center gap-2">{action}</div>}
          </div>
        )}
      </div>
      <main className="w-full">
        <div className="flex justify-center ">
          <div className={` ${className}`}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
