import { useCallback } from "react";
import { useTouchColor } from "@/hooks/useTouchColor";

export function TouchColorImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { ref, onPointerDown, ...touchProps } = useTouchColor();
  const { onPointerDown: propsOnPointerDown, ...rest } = props;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      propsOnPointerDown?.(e);
      onPointerDown(e);
    },
    [propsOnPointerDown, onPointerDown],
  );

  return <img ref={ref} onPointerDown={handlePointerDown} {...touchProps} {...rest} />;
}
