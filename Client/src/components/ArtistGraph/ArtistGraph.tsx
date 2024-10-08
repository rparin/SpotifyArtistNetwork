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
import { useThemeState } from "@/hooks/useThemeState";
import {
  useImgMat,
  Node,
  getNodePreview,
  useUpdateSize,
  getArtistSphere,
  getGraphSphere,
} from "@/lib/graphUtils";
import useTabActive from "@/hooks/useTabActive";

const ArtistGraph = (props: { graphData: any }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [gData, setGData] = useState<any | null>(props.graphData);
  const { winSize, updateSize } = useUpdateSize(fgRef);
  const [nodePreview, setNodePreview] = useState<any | null>(null);
  const imgMaterial = useImgMat(props.graphData.nodes);
  const [isClickedEnabled, setIsClickedEnabled] = useState(true);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const [isNodeImgUsed, setIsNodeImgUsed] = useState(false);
  const [isFinalLoadDone, setIsFinalLoadDone] = useState(false);
  const { signalThemeState } = useThemeState();
  const visibilityState = useTabActive();
  const [searchValue, setSearch] = useState<undefined | any>(undefined);
  const [inputSearchString, setInputSearchString] = useState("");

  useEffect(() => {
    if (fgRef) {
      if (visibilityState) {
        fgRef.current?.resumeAnimation();
      } else {
        fgRef.current?.pauseAnimation();
      }
    }
  }, [fgRef, visibilityState]);

  const handleSearchSelect = async (item: any) => {
    zoomToNode(item);
    await delay(2100);
  };

  const handleOnSearch = async (value: string, results: any[]) => {
    if (value.replace(/ /g, "") != "" && results.length > 0) {
      setSearch(results[0]);
      setIsClickedEnabled(false);
      await delay(2000);
      setIsClickedEnabled(true);
    }
  };

  const unfocusInput = () => {
    const divElements = document.getElementById("graph");
    divElements?.click();
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue) {
      handleSearchSelect(searchValue);
      setInputSearchString(searchValue.name);
      await delay(100);
      unfocusInput();
    }
  };

  const zoomToNode = useCallback(
    async (node: Node | any) => {
      setIsHoverEnabled(false);
      setNodePreview(getNodePreview(node));
      const distance = 100;
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

  const getArtistNode = useCallback(
    (node: Node | any) => {
      return getArtistSphere(node, imgMaterial[node.id]);
    },
    [imgMaterial]
  );

  const getLoadNode = useCallback(() => {
    return getGraphSphere(signalThemeState == "dark" ? 0xffffff : 0x000000);
  }, []);

  if (!gData) {
    return <LoadText text="Rendering Network..." />;
  }

  return (
    <>
      {!isFinalLoadDone && <LoadText text="Loading.." />}

      <div className="absolute top-24 md:top-14 left-0 right-0 m-auto z-[80]">
        <div className="relative flex w-full justify-center gap-2">
          <form
            onSubmit={handleOnSubmit}
            className="w-[60%] md:w-[40%] lg:w-[30%] z-[80]">
            <ReactSearchAutocomplete
              className="w-full"
              items={props.graphData.nodes}
              onSelect={handleSearchSelect}
              formatResult={(item: any) => {
                return GraphSearchResult(item);
              }}
              placeholder="Enter artist name"
              showIcon={false}
              maxResults={5}
              onSearch={handleOnSearch}
              inputSearchString={inputSearchString}
              autoFocus={false}
            />
          </form>
          <div className="bg-background border-2 hover:bg-input rounded-full px-[0.4rem] my-1 flex items-center">
            <RefreshCw
              onClick={() => {
                updateSize();
                fgRef.current?.zoomToFit(500);
                setNodePreview(null);
              }}
              aria-label="Reload graph"
            />
          </div>
        </div>
      </div>
      <div id="graph" className="bg-background">
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
          nodeThreeObject={isNodeImgUsed ? getArtistNode : getLoadNode}
          nodeThreeObjectExtend={false}
          cooldownTicks={100}
          cooldownTime={Infinity}
          onEngineStop={async () => {
            setIsNodeImgUsed(true);
            await delay(3000);
            setIsFinalLoadDone(true);
          }}
        />
      </div>

      <div className="absolute z-40 bottom-7 md:bottom-12 mb-2 flex justify-center w-full">
        {getPreview()}
      </div>
    </>
  );
};

export default ArtistGraph;
