import delay from "@/utils/delay";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { ForceGraphMethods } from "react-force-graph-3d";

export default function useUpdateSize(
  fgRef: MutableRefObject<ForceGraphMethods<any> | undefined>
) {
  const [winSize, setWinSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  const updateSize = useCallback(async () => {
    setWinSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  async function clearSize() {
    setWinSize({
      width: undefined,
      height: undefined,
    });
    await delay(200);
    fgRef?.current?.zoomToFit(200);
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);
  return { winSize, updateSize, clearSize };
}
