import React from "react";
export const useOutsideClick = (callback: Function) => {
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};
