import { RefObject, useEffect, useState } from "react";

interface InfiniteScrollProps {
  elementRef: RefObject<HTMLDivElement | null>;
  isLoading?: boolean;
  hasMoreData?: boolean;
  loadOnMount?: boolean;
  orientation?: "top" | "bottom";
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  elementRef,
  onLoadMore,
  isLoading = false,
  hasMoreData = false,
  loadOnMount = false,
  orientation = "top",
}: InfiniteScrollProps) => {
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onLoadMore();
      setInitialLoad(false);
    }
  }, [initialLoad, loadOnMount, onLoadMore]);

  useEffect(() => {
    const onScroll = () => {
      if (!isLoading && hasMoreData) {
        if (orientation === "top" && isTop(elementRef)) {
          onLoadMore();
        } else if (orientation === "bottom" && isBottom(elementRef)) {
          onLoadMore();
        }
      }
    };
    elementRef.current?.addEventListener("scroll", onScroll);
    const elRef = elementRef.current;
    return () => {
      elRef && elRef.removeEventListener("scroll", onScroll);
    };
  }, [elementRef, hasMoreData, isLoading, orientation, onLoadMore]);

  const isTop = (ref: RefObject<HTMLDivElement | null>, topOffset = 0): boolean => {
    if (!ref.current) return false;

    return ref.current.scrollTop === topOffset;
  };

  const isBottom = (ref: RefObject<HTMLDivElement | null>, bottomOffset = 0): boolean => {
    if (!ref.current) return false;

    return (
      ref.current.offsetHeight + ref.current.scrollTop >=
      (ref.current.scrollHeight - bottomOffset)
    );
  };
};
