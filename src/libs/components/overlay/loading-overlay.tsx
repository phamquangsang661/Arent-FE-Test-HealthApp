
export interface LoadingOverlay {
  isLoading: boolean;
  message?: string;
}
export const LoadingOverlay = ({
  isLoading,
  message = "Loading..."
}: LoadingOverlay) => {
  return (
    <>
      {isLoading && <div className="fixed left-0 top-0 z-[9999] flex min-h-screen w-full items-center justify-center text-md font-bold text-primary">
        <div className="flex flex-col gap-3 items-center">
          <div className="loader w-[80px] h-[80px] rounded-full animate-spin border-4 border-primary"></div>
          <span>{message}</span>
        </div>
        <div className="absolute z-[-999] h-full w-full bg-light opacity-70"></div>
      </div>}
    </>
  );
};
