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
      {
        isLoading && <Dimmer active >
          {/* @ts-expect-error Loding Component */}
          <Loader size="huge" className="!text-primary-500 !font-hiragino after:!border-[#EA6C00_transparent_transparent]">{message}</Loader>
        </Dimmer>
      }
    </>
  );
};
