"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import * as THREE from "three";
import { effect } from "@preact/signals-core";
import { signalTheme } from "../UI/ThemeToggle";
import { fetchArtistNetwork } from "@/lib/API/Spotify/SpotifyAPI";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";
import { getMatObj, Node, nodeVal, getNodePreview } from "./helper";
import { delay } from "@/lib/utils";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { useSpotifyCToken } from "@/hooks/useSpotifyCToken";
import { useQuery } from "@tanstack/react-query";

const Graph = (props: { id?: string }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [loadData, setLoadData] = useState({ nodes: [{ id: 0 }], links: [] });
  const [reload, setReload] = useState(false);
  const [artistPreview, setArtistPreview] = useState<any | null>(null);
  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );
  const [imgMaterial, setImgMaterial] = useState<any>(null);
  const [winSize, setWinSize] = useState<any>({
    width: undefined,
    height: undefined,
  });

  const cTokenQuery = useSpotifyCToken(props?.id != undefined);

  const {
    data: graphData,
    isLoading: isGraphLoading,
    isError: isGraphError,
    error: graphError,
  } = useQuery({
    enabled: !!cTokenQuery.data,
    queryKey: ["network", props.id],
    queryFn: async () => {
      return fetchArtistNetwork(props.id as string, "2", cTokenQuery.data);
    },
    staleTime: 1800000, //cache network data for 30 minutes
  });

  const updateSize = async () => {
    setWinSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    await delay(200);
    fgRef?.current?.zoomToFit(200);
  };

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
    }, 500);
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

  const refreshGraph = async () => {
    setLoadData({ nodes: [{ id: 0 }], links: [] });
    const loadIntervalId = loadIntervalFunc();
    const camIntervalId = camIntervalFunc();
    setReload(true);
    setArtistPreview(null);
    await delay(2000);
    clearInterval(loadIntervalId);
    clearInterval(camIntervalId);
    setReload(false);
    updateSize();
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

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    const loadIntervalId = loadIntervalFunc();
    const camIntervalId = camIntervalFunc();

    if (cTokenQuery.isLoading == isGraphLoading && !isGraphLoading) {
      clearInterval(loadIntervalId);
      clearInterval(camIntervalId);
      setImgMaterial(getMatObj(graphData.nodes));
      updateSize();
    }

    return () => {
      window.removeEventListener("resize", updateSize);
      effect(() => setSignalThemeState(signalTheme.value));
      clearInterval(loadIntervalId);
      clearInterval(camIntervalId);
    };
  }, [cTokenQuery.isLoading, isGraphLoading]);

  const handleOnSelect = async (item: any) => {
    zoomToNode(item);
    await delay(2100);
    setArtistPreview(getNodePreview(item));
  };

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

  const isLoading = () => {
    if (reload) return true;
    return cTokenQuery.isLoading || isGraphLoading;
  };

  return (
    <>
      <div className="relative">
        {isLoading() && (
          <div className="absolute flex justify-center text-center items-center z-40 w-full h-screen">
            <h1 className="select-none text-2xl bg-teal-200/75 dark:bg-teal-600/60 px-20 py-2 rounded-lg backdrop-blur-md horizontal-mask">
              Loading...
            </h1>
          </div>
        )}

        {!isLoading() && (
          <div className="absolute top-24 md:top-14 left-0 right-0 m-auto z-30">
            <div className="relative flex w-full justify-center gap-2">
              <ReactSearchAutocomplete
                className="w-[60%] md:w-[40%] lg:w-[30%]"
                items={graphData?.nodes}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                placeholder="Enter artist name"
              />
              <div className="bg-background border-2 hover:bg-input rounded-full px-[0.4rem] my-1 flex items-center">
                <RefreshCw onClick={refreshGraph} />
                <span className="sr-only">Reload graph</span>
              </div>
            </div>
          </div>
        )}

        <ForceGraph3D
          width={winSize.width}
          height={winSize.height}
          showNavInfo={false}
          backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
          linkColor={() => "#1db954"}
          linkOpacity={0.5}
          ref={fgRef}
          graphData={isLoading() ? loadData : graphData}
          nodeLabel="name"
          onNodeClick={isLoading() ? () => {} : zoomToNode}
          onNodeHover={isLoading() ? () => {} : handleHover}
          nodeThreeObject={(node: Node | any) => {
            if (isLoading()) {
              const geometry = new THREE.SphereGeometry(7, 10, 10);
              const material = new THREE.MeshBasicMaterial({
                color: signalThemeState == "dark" ? 0xffffff : 0x000000,
              });
              const sphere = new THREE.Mesh(geometry, material);
              return sphere;
            }
            let sphere = new THREE.Sprite(imgMaterial[node.id]);
            const size = 10 + nodeVal(node);
            sphere.scale.set(size, size, 1);
            return sphere;
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
      </div>
    </>
  );
};

export default Graph;
