'use client';

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Latest Dream Skeleton */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-8">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 rounded-xl border-2 border-gray-200">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Skeleton */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-8">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-12"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>

      {/* Timeline */}
      <div className="mb-8 relative">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div className="mt-3 space-y-1">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-12 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="border-t pt-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 rounded-xl border-2 border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MythologySkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Phase */}
        <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-3xl p-6 border border-pink-200/50">
          <div className="h-6 bg-purple-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-purple-100 rounded w-2/3"></div>
        </div>

        {/* Narrative */}
        <div className="bg-white/50 rounded-3xl p-8 border border-gray-200/50 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Evolution */}
        <div className="bg-blue-100/30 rounded-3xl p-6 border border-blue-200/50">
          <div className="h-5 bg-blue-200 rounded w-1/4 mb-3"></div>
          <div className="h-4 bg-blue-100 rounded w-full"></div>
          <div className="h-4 bg-blue-100 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export function DialogueSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-6 rounded-xl border-2 border-gray-200 text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-purple-200 rounded w-2/3 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
