import { Skeleton } from "@mui/material";

const CardLoaderSkeleton = () => {
  return (
    <div className="relative group cursor-pointer transition-all duration-500 ease-out">
      <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 ease-out">
 
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gray-300/20 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20" />
        </div>
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <div className="flex items-center gap-2">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
          </div>

          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

          <div className="flex flex-col gap-2 mb-6">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-right">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
            
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </div>
        </div>

        <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </div>
    </div>
  );
};

export default CardLoaderSkeleton;