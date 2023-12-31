"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { delay } from "@/lib/utils";
import { useThemeState } from "@/hooks/useThemeState";
import { useUpdateSize } from "@/lib/graphUtils";
import { getGraphSphere } from "@/lib/graphUtils";
import LoadText from "../LoadText";

const LoadingGraph = () => {
  const fgRef = useRef<ForceGraphMethods>();
  const { signalThemeState } = useThemeState();
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
      <LoadText text="Loading..." />
      <div className="absolute z-[100]">
        <ForceGraph3D
          width={winSize.width}
          height={winSize.height}
          showNavInfo={false}
          backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
          linkColor={() => "#ff005a"}
          linkWidth={0.5}
          linkOpacity={0.5}
          ref={fgRef}
          graphData={loadData}
          nodeThreeObject={() => {
            return getGraphSphere(
              signalThemeState == "dark" ? 0xffffff : 0x000000
            );
          }}
          nodeThreeObjectExtend={false}
        />
      </div>
    </>
  );
};

export default LoadingGraph;
