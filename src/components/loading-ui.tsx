import { Skeleton } from "./ui/skeleton";

export default function LoadingUI() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-700 dark:border-t-blue-400"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Processing your grades...
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
