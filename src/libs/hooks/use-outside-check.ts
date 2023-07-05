import { RefObject, useEffect } from "react";
/**
 * this hook check if the mouse is click outside the tag with ref
 * @param ref
 * @param callback
 */
export const useOutsideCheck = <T>({
  ref,
  callback,
}: {
  ref: RefObject<HTMLElement>;
  callback: () => Promise<void> | void;
}) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event?.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
