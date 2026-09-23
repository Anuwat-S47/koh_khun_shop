export interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
}