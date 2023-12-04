"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";
import GraphSearchResult from "@/components/GraphSearchResult";
import { delay } from "@/lib/utils";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { RefreshCw } from "lucide-react";
import LoadingForceGraph from "../LoadingGraph/LoadingGraphWrapper";
import { useThemeState } from "@/hooks/useThemeState";
import {
  useImgMat,
  Node,
  getNodePreview,
  useReloadGraph,
  useUpdateSize,
  getArtistSphere,
  getLoadingArtistSphere,
} from "@/lib/graphUtils";

const ArtistGraph = (props: { graphData: any }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [gData, setGData] = useState<any | null>(null);
  const { signalThemeState } = useThemeState();
  const { winSize, updateSize } = useUpdateSize(fgRef);
  const [nodePreview, setNodePreview] = useState<any | null>(null);
  const imgMaterial = useImgMat(props.graphData.nodes);
  const [isClickedEnabled, setIsClickedEnabled] = useState(true);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const { reload, refreshGraph } = useReloadGraph(() => {
    setNodePreview(null);
  });

  useEffect(() => {
    setGData(props.graphData);
    updateSize();
  }, []);

  const zoomToNode = useCallback(
    async (node: Node | any) => {
      setIsHoverEnabled(false);
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
      await delay(2500);
      setIsHoverEnabled(true);
      setNodePreview(getNodePreview(node));
    },
    [fgRef]
  );

  const handleHover = useCallback((node: Node | any) => {
    if (node?.id) {
      if (nodePreview && node.id == nodePreview.id) {
        return;
      }
      setNodePreview(getNodePreview(node));
    }
  }, []);

  const handleSearchSelect = async (item: any) => {
    zoomToNode(item);
    await delay(2100);
  };

  const getPreview = () => {
    if (!nodePreview) return;
    if (nodePreview.type == "artist") {
      return (
        <div className="absolute z-40 bottom-24 mb-2 flex justify-center w-full">
          <ArtistCardHorizontal
            name={nodePreview.name}
            img={nodePreview.img}
            alt={`${nodePreview.name} profile picture`}
            genres={nodePreview.genres}
            followers={nodePreview.followers}
            pop={nodePreview.pop}
            url={nodePreview.url}
            id={nodePreview.id}
          />
        </div>
      );
    }
  };

  //Show reloading graph on reload or no graphData
  if (reload || !gData) {
    return <LoadingForceGraph />;
  }

  return (
    <>
      <div className="absolute top-24 md:top-14 left-0 right-0 m-auto z-[100]">
        <div className="relative flex w-full justify-center gap-2">
          <ReactSearchAutocomplete
            className="w-[60%] md:w-[40%] lg:w-[30%] z-[100]"
            items={props.graphData.nodes}
            onSelect={handleSearchSelect}
            formatResult={(item: any) => {
              return GraphSearchResult(item);
            }}
            placeholder="Enter artist name"
            showIcon={false}
            maxResults={5}
            onSearch={async () => {
              setIsClickedEnabled(false);
              await delay(2000);
              setIsClickedEnabled(true);
            }}
            autoFocus={false}
          />
          <div className="bg-background border-2 hover:bg-input rounded-full px-[0.4rem] my-1 flex items-center">
            <RefreshCw onClick={refreshGraph} aria-label="Reload graph" />
          </div>
        </div>
      </div>
      <ForceGraph3D
        width={winSize.width}
        height={winSize.height}
        showNavInfo={false}
        backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
        linkColor={() => "#1db954"}
        linkOpacity={0.5}
        ref={fgRef}
        graphData={gData}
        nodeLabel="name"
        onNodeClick={isClickedEnabled ? zoomToNode : undefined}
        onNodeHover={isHoverEnabled ? handleHover : undefined}
        nodeThreeObject={(node: Node | any) => {
          if (imgMaterial != null) {
            return getArtistSphere(node, imgMaterial[node.id]);
          }
          return getLoadingArtistSphere(node);
        }}
        nodeThreeObjectExtend={false}
      />

      {getPreview()}
    </>
  );
};

export default ArtistGraph;
