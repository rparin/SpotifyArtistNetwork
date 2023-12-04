"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import LoadingForceGraph from "../LoadingGraph/LoadingGraphWrapper";
import GraphSearchResult from "../GraphSearchResult";
import { RefreshCw } from "lucide-react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { useThemeState } from "@/hooks/useThemeState";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { delay } from "@/lib/utils";
import {
  useImgMat,
  Node,
  useUpdateSize,
  useReloadGraph,
  getArtistSphere,
  getLoadingArtistSphere,
} from "@/lib/graphUtils";

const MyNetworkGraph = (props: { graphData: any }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const { signalThemeState } = useThemeState();
  const { winSize } = useUpdateSize(fgRef);
  const imgMaterial = useImgMat(props.graphData.nodes);
  const { reload, refreshGraph } = useReloadGraph();

  const zoomToNode = useCallback(
    (node: Node | any) => {
      const distance = 50;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      if (fgRef.current) {
        fgRef.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          2000
        );
      }
    },
    [fgRef]
  );

  const handleSearchSelect = async (item: any) => {
    zoomToNode(item);
  };

  if (reload) {
    return <LoadingForceGraph />;
  }

  return (
    <>
      <div className="absolute top-24 md:top-14 left-0 right-0 m-auto z-30">
        <div className="relative flex w-full justify-center gap-2">
          <ReactSearchAutocomplete
            className="w-[60%] md:w-[40%] lg:w-[30%]"
            items={props.graphData.nodes}
            onSelect={handleSearchSelect}
            formatResult={(item: any) => {
              return GraphSearchResult(item);
            }}
            placeholder="Enter artist name"
          />
          <div className="bg-background border-2 hover:bg-input rounded-full px-[0.4rem] my-1 flex items-center">
            <RefreshCw onClick={refreshGraph} aria-label="Reload graph" />
          </div>
        </div>
      </div>

      <ForceGraph3D
        ref={fgRef}
        width={winSize.width}
        height={winSize.height}
        showNavInfo={false}
        backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
        linkColor={(node: Node | any) => {
          return node.linkType == "main" ? "green" : "blue";
        }}
        onNodeClick={zoomToNode}
        linkOpacity={0.5}
        graphData={props.graphData}
        nodeLabel="name"
        nodeThreeObject={(node: Node | any) => {
          if (imgMaterial != null) {
            return getArtistSphere(node, imgMaterial[node.id]);
          }
          return getLoadingArtistSphere(node);
        }}
        nodeThreeObjectExtend={false}
      />
    </>
  );
};

export default MyNetworkGraph;
