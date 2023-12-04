"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";
import { delay } from "@/lib/utils";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import LoadingForceGraph from "../LoadingGraph/LoadingGraphWrapper";
import { useThemeState } from "@/hooks/useThemeState";
import {
  getMatObj,
  Node,
  getNodePreview,
  useUpdateSize,
  getArtistSphere,
  getLoadingArtistSphere,
} from "@/lib/graphUtils";

const ArtistGraph = (props: { graphData: any }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const { signalThemeState } = useThemeState();
  const { winSize } = useUpdateSize(fgRef);
  const [reload, setReload] = useState(false);
  const [artistPreview, setArtistPreview] = useState<any | null>(null);
  const [imgMaterial, setImgMaterial] = useState<any>(null);

  useEffect(() => {
    if (props.graphData.nodes) {
      setImgMaterial(getMatObj(props.graphData.nodes));
    }
  }, [props.graphData.nodes]);

  const refreshGraph = async () => {
    setReload(true);
    setArtistPreview(null);
    await delay(2000);
    setReload(false);
  };

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

  const handleHover = useCallback((node: Node | any) => {
    if (node?.id) {
      if (artistPreview && node.id == artistPreview.id) {
        return;
      }
      setArtistPreview(getNodePreview(node));
    }
  }, []);

  const handleSearchSelect = async (item: any) => {
    zoomToNode(item);
    await delay(2100);
    setArtistPreview(getNodePreview(item));
  };

  // const getArtistSphere = useCallback(
  //   (node: Node, material: THREE.SpriteMaterial) => {
  //     let sphere = new THREE.Sprite(material);
  //     const size = 10 + nodeVal(node);
  //     sphere.scale.set(size, size, 1);
  //     return sphere;
  //   },
  //   []
  // );

  const formatResult = (item: any) => {
    return (
      <>
        <div className="flex gap-3">
          <Image
            className="h-7 w-7 object-cover rounded-[50%]"
            width={100}
            height={100}
            src={item.img}
            alt={`${item.name} Spotify profile pic`}
          />
          {item.name}
        </div>
      </>
    );
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
            formatResult={formatResult}
            placeholder="Enter artist name"
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
        graphData={props.graphData}
        nodeLabel="name"
        onNodeClick={zoomToNode}
        onNodeHover={handleHover}
        nodeThreeObject={(node: Node | any) => {
          if (imgMaterial != null) {
            return getArtistSphere(node, imgMaterial[node.id]);
          }
          return getLoadingArtistSphere(node);
        }}
        nodeThreeObjectExtend={false}
      />

      {artistPreview && (
        <div className="absolute z-40 bottom-24 mb-2 flex justify-center w-full">
          <ArtistCardHorizontal
            name={artistPreview.name}
            img={artistPreview.img}
            alt={`${artistPreview.name} profile picture`}
            genres={artistPreview.genres}
            followers={artistPreview.followers}
            pop={artistPreview.pop}
            url={artistPreview.url}
            id={artistPreview.id}
          />
        </div>
      )}
    </>
  );
};

export default ArtistGraph;
