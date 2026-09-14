import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function ServiceCardSkeleton() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 shrink-0" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-2/5" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </Card>
  );
}

export function ProviderCardSkeleton() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 shrink-0" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-9 w-full" />
    </Card>
  );
}

export function CategoryCardSkeleton() {
  return (
    <Card className="flex flex-col gap-3">
      <Skeleton className="h-11 w-11" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
    </Card>
  );
}
