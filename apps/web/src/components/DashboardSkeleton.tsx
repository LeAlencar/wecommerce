import { Skeleton } from "./ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col m-24 justify-center">
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col m-24 justify-center">
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col m-24 justify-center">
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}