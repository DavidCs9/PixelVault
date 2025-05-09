export default function GameListLoader({ theme }: { theme: string }) {
  return (
    <div className="container flex h-[80vh] flex-col gap-3 overflow-auto">
      {/* Search and Pagination Skeleton */}
      <div className="flex justify-between gap-4">
        <div
          className="h-10 w-64 animate-pulse rounded-md"
          style={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
          }}
        />
        <div className="flex items-center gap-4">
          <div
            className="h-6 w-6 animate-pulse rounded-full"
            style={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
            }}
          />
          <div
            className="h-6 w-24 animate-pulse rounded-md"
            style={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
            }}
          />
          <div
            className="h-6 w-6 animate-pulse rounded-full"
            style={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
            }}
          />
        </div>
      </div>
      {/* Game Cards Skeleton */}
      <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800"
          >
            <div
              className="h-48 animate-pulse"
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
              }}
            />
            <div
              className="absolute right-0 bottom-0 left-0 bg-black/80 p-2"
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
              }}
            >
              <div
                className="mb-2 h-6 w-3/4 animate-pulse rounded-md"
                style={{
                  backgroundColor: theme === "dark" ? "#374151" : "#d1d5db",
                }}
              />
              <div
                className="h-4 w-1/2 animate-pulse rounded-md"
                style={{
                  backgroundColor: theme === "dark" ? "#374151" : "#d1d5db",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
