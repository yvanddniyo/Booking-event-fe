import { Skeleton } from "@mui/material";

const SinglePageLoader = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 md:p-6 p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 w-full border-[0.5px] border-gray-200 rounded-lg p-4">
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </div>

        <div className="flex-1 border-[0.5px] border-gray-200 rounded-lg p-4 flex flex-col gap-4">
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
             <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
             <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
    
            <div className="flex items-center gap-2">
              <Skeleton variant="text" width={'200px'} sx={{ fontSize: '1rem' }} />
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


            <div className="flex items-center gap-2">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
          </div>
          <div className="flex justify-center">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageLoader;
