import { Dimmer, Loader } from "semantic-ui-react";

export interface LoadingOverlay {
  isLoading: boolean;
  message?: string;
}
export const LoadingOverlay = ({
  isLoading,
  message = "読み込み中..."
}: LoadingOverlay) => {
  return (
    <>
      {/* {isLoading && <div className="fixed left-0 top-0 z-[9999] flex min-h-screen w-full items-center justify-center text-md font-bold text-primary-500">
        <div className="flex flex-col gap-3 items-center">
          <div className=" w-[80px] h-[80px] rounded-full border-4 border-primary-500"></div>
          <span>{message}</span>
        </div>
        <div className="absolute z-[-999] h-full w-full bg-light opacity-70"></div>
      </div>} */}
      {
        isLoading && <Dimmer active >
          <Loader size="huge" className="!text-primary-500 !font-hiragino after:!border-[#EA6C00_transparent_transparent]">{message}</Loader>
        </Dimmer>
      }
    </>
  );
};
