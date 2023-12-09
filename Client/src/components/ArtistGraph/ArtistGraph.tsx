"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";
import { UserCardHorizontal } from "../UserCardHorizontal";
import GraphSearchResult from "@/components/GraphSearchResult";
import { delay } from "@/lib/utils";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { RefreshCw } from "lucide-react";
import LoadText from "../LoadText";
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
  const [gData, setGData] = useState<any | null>(props.graphData);
  const { winSize, updateSize } = useUpdateSize(fgRef);
  const [nodePreview, setNodePreview] = useState<any | null>(null);
  const imgMaterial = useImgMat(props.graphData.nodes);
  const [isClickedEnabled, setIsClickedEnabled] = useState(true);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const { reload, refreshGraph } = useReloadGraph(() => {
    setNodePreview(null);
  });

  useEffect(() => {
    updateSize();
  }, [updateSize]);

  const zoomToNode = useCallback(
    async (node: Node | any) => {
      setIsHoverEnabled(false);
      setNodePreview(getNodePreview(node));
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
    },
    [fgRef]
  );

  const handleHover = useCallback(
    (node: Node | any) => {
      if (node?.id) {
        if (nodePreview && node.id == nodePreview.id) {
          return;
        }
        setNodePreview(getNodePreview(node));
      }
    },
    [nodePreview]
  );

  const handleSearchSelect = async (item: any) => {
    zoomToNode(item);
    await delay(2100);
  };

  const getPreview = () => {
    if (!nodePreview) return;
    if (nodePreview.type == "artist") {
      return (
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
      );
    }
    return (
      <UserCardHorizontal
        name={nodePreview.name}
        img={nodePreview.img}
        alt={`${nodePreview.name} profile picture`}
        followers={nodePreview.followers}
        url={nodePreview.url}
        id={nodePreview.id}
      />
    );
  };

  if (!gData) {
    return <LoadText text="Rendering Network..." />;
  }

  if (reload) {
    return <LoadText text="Refreshing..." />;
  }

  return (
    <>
      <div className="absolute top-24 md:top-14 left-0 right-0 m-auto z-[80]">
        <div className="relative flex w-full justify-center gap-2">
          <ReactSearchAutocomplete
            className="w-[60%] md:w-[40%] lg:w-[30%] z-[80]"
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
      <div className="bg-background">
        <ForceGraph3D
          width={winSize.width}
          height={winSize.height}
          showNavInfo={false}
          backgroundColor={"#00000000"}
          linkColor={(node: Node | any) => {
            if (node.linkType) {
              return node.linkType == "main" ? "#1db3b9" : "#1db966";
            }
            return "#1db954";
          }}
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
      </div>

      <div className="absolute z-40 bottom-7 md:bottom-12 mb-2 flex justify-center w-full">
        {/* {getPreview()} */}
      </div>
    </>
  );
};

export default ArtistGraph;
