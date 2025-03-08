"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import useUpdateSize from "@/hooks/Graph/useUpdateSize";
import getNodeColor from "@/services/Graph/GetNodeColor";
import FullScreenLoadText from "@/components/FullScreenLoadText";
import delay from "@/utils/delay";

function LoadingGraph() {
  const { theme } = useTheme();
  const fgRef = useRef<ForceGraphMethods>();
  const { winSize, updateSize } = useUpdateSize(fgRef);
  const [loadData, setLoadData] = useState({ nodes: [{ id: 0 }], links: [] });

  const loadIntervalFunc = useCallback(() => {
    return setInterval(() => {
      setLoadData(({ nodes, links }): any => {
        const id = nodes.length;
        return {
          nodes: [...nodes, { id }],
          links: [
            ...links,
            { source: id, target: Math.round(Math.random() * (id - 1)) },
          ],
        };
      });
    }, 770);
  }, []);

  const camIntervalFunc = useCallback(() => {
    const distance = 400;
    if (fgRef.current) {
      fgRef.current.cameraPosition({ z: distance });

      // camera orbit
      let angle = 0;
      const camIntervalId = setInterval(() => {
        if (fgRef.current) {
          fgRef.current.cameraPosition({
            x: distance * Math.sin(angle),
            z: distance * Math.cos(angle),
          });
          angle += Math.PI / 200;
        }
      }, 10);

      return camIntervalId;
    }
  }, [fgRef]);

  useEffect(() => {
    updateSize();
    const loadIntervalId = loadIntervalFunc();
    const camIntervalId = camIntervalFunc();

    const stopLoad = async () => {
      await delay(60000);
      clearInterval(loadIntervalId);
    };

    stopLoad();

    return () => {
      clearInterval(loadIntervalId);
      clearInterval(camIntervalId);
    };
  }, [loadIntervalFunc, camIntervalFunc, updateSize]);

  return (
    <>
      <FullScreenLoadText text="Loading..." />
      <div className="absolute z-[100]">
        <ForceGraph3D
          ref={fgRef}
          width={winSize.width}
          height={winSize.height}
          showNavInfo={false}
          backgroundColor={theme == "light" ? "#E2E8F0" : "#020817"}
          linkColor={() => "#ff005a"}
          linkWidth={0.5}
          linkOpacity={0.5}
          graphData={loadData}
          nodeThreeObject={() => {
            return getNodeColor(theme == "dark" ? 0xffffff : 0x000000);
          }}
          nodeThreeObjectExtend={false}
        />
      </div>
    </>
  );
}

//Run the Graph client side
const LoadingForceGraph = dynamic(() => Promise.resolve(LoadingGraph), {
  ssr: false,
});

export default LoadingForceGraph;
