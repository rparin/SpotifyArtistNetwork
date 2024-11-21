"use client";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { RefreshCw } from "lucide-react";
import { SpotifyNetworkMap } from "@/dto/Spotify/SpotifyArtistNetworkDto";
import { SpotifyGraphArtistNode } from "@/dto/Spotify/SpotifyGraphArtistNodeDto";
import useTabActive from "@/hooks/useTabActive";
import useImgMat from "@/hooks/Graph/useImgMat";
import useUpdateSize from "@/hooks/Graph/useUdateSize";
import getArtistSphereSize from "@/services/Graph/GetArtistSphereSize";
import getGraphSphereColor from "@/services/Graph/GetGraphSphereColor";
import FullScreenLoadText from "@/components/FullScreenLoadText";
import GraphSearchResult from "@/components/Spotify/GraphSearchResult";
import ArtistCardHorizontal from "@/components/Spotify/ArtistCardHorizontal";
import delay from "@/utils/delay";

const RelatedArtistGraph = (props: { graphData: SpotifyNetworkMap }) => {
  const fgRef = useRef<ForceGraphMethods<SpotifyGraphArtistNode>>();

  //States
  const [isNodeImgUsed, setIsNodeImgUsed] = useState(false);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const [isFinalLoadDone, setIsFinalLoadDone] = useState(false);
  const [isClickedEnabled, setIsClickedEnabled] = useState(true);
  const [inputSearchString, setInputSearchString] = useState("");
  const [nodePreview, setNodePreview] = useState<SpotifyGraphArtistNode | null>(
    null
  );
  const [searchValue, setSearch] = useState<undefined | SpotifyGraphArtistNode>(
    undefined
  );

  //Hooks
  const { theme } = useTheme();
  const visibilityState = useTabActive();
  const { winSize, updateSize } = useUpdateSize(fgRef);
  const imgMaterial = useImgMat(props.graphData.nodes);

  useEffect(() => {
    if (fgRef) {
      if (visibilityState) {
        fgRef.current?.resumeAnimation();
      } else {
        fgRef.current?.pauseAnimation();
      }
    }
  }, [fgRef, visibilityState]);

  const handleSearchSelect = async (result: SpotifyGraphArtistNode) => {
    zoomToNode(result);
    await delay(2100);
  };

  const handleOnSearch = async (
    value: string,
    results: SpotifyGraphArtistNode[]
  ) => {
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
    async (node: SpotifyGraphArtistNode) => {
      setIsHoverEnabled(false);
      setNodePreview(node);
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
    (node: SpotifyGraphArtistNode | undefined | null) => {
      if (node?.id) {
        if (nodePreview && node.id == nodePreview.id) {
          return;
        }
        setNodePreview(node);
      }
    },
    [nodePreview]
  );

  const getArtistNode = useCallback(
    (node: SpotifyGraphArtistNode) => {
      return getArtistSphereSize(node, imgMaterial[node.id]);
    },
    [imgMaterial]
  );

  const getLoadNode = useCallback(() => {
    return getGraphSphereColor(theme == "dark" ? 0xffffff : 0x000000);
  }, [theme]);

  if (!props.graphData) {
    return <FullScreenLoadText text="Rendering Network..." />;
  }

  return (
    <>
      {!isFinalLoadDone && <FullScreenLoadText text="Loading.." />}

      <div className="absolute left-0 right-0 top-24 z-[80] m-auto md:top-14">
        <div className="relative flex w-full justify-center gap-2">
          <form
            onSubmit={handleOnSubmit}
            className="z-[80] w-[60%] md:w-[40%] lg:w-[30%]">
            <ReactSearchAutocomplete
              className="w-full"
              items={props.graphData.nodes as any}
              onSelect={handleSearchSelect}
              formatResult={(item: SpotifyGraphArtistNode) => {
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
          <div className="my-1 flex items-center rounded-full border-2 bg-background px-[0.4rem] hover:bg-input">
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
          ref={fgRef}
          width={winSize.width}
          height={winSize.height}
          showNavInfo={false}
          backgroundColor={"#00000000"}
          linkColor={() => {
            return "#1db954";
          }}
          linkOpacity={0.5}
          graphData={props.graphData as any}
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

      {nodePreview && (
        <div className="absolute bottom-7 z-40 mb-2 flex w-full justify-center md:bottom-12">
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
      )}
    </>
  );
};

export default RelatedArtistGraph;
