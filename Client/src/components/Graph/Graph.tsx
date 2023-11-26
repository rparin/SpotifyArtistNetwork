"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { Aimer, Aimer3 } from "../../../public/data/Aimer";
import * as THREE from "three";
import { effect } from "@preact/signals-core";
import { signalTheme } from "../UI/ThemeToggle";
import {
  fetchArtistNetwork,
  checkClientToken,
  ClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";
import { getMatObj, Node, nodeVal, getNodePreview } from "./helper";
import { delay } from "@/lib/utils";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Image from "next/image";

const Graph = (props: { id?: string }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [data, setData] = useState(Aimer);
  const [loadData, setLoadData] = useState({ nodes: [{ id: 0 }], links: [] });
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<ClientToken | null>(null);
  const [artistPreview, setArtistPreview] = useState<any | null>(null);
  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );
  const [imgMaterial, setImgMaterial] = useState<any>(null);
  const [imgMaterialOutline, setImgMaterialOutline] = useState<any>(null);
  const [winSize, setWinSize] = useState<any>({
    width: undefined,
    height: undefined,
  });
  const [nodeHighlight, setNodeHighlight] = useState<string>("");
  const [searchItems, setSearchItems] = useState<any>();

  const updateSize = async () => {
    setWinSize({ width: window.innerWidth, height: window.innerHeight });
    await delay(200); //for 1 sec delay
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

  const getData = async () => {
    if (!props.id) return;
    const loadIntervalId = loadIntervalFunc();
    const camIntervalId = camIntervalFunc();
    const depth = "2";
    const cToken = await checkClientToken(accessToken);
    setAccessToken(cToken);
    if (!cToken) return;
    const res = await fetchArtistNetwork(props.id, depth, cToken.access_token);
    if (res.error || !res) return;
    setData(res.relatedArtists);
    setImgMaterial(getMatObj(res.relatedArtists.nodes));
    setImgMaterialOutline(getMatObj(res.relatedArtists.nodes, true));
    setSearchItems(res.relatedArtists.nodes);
    setLoading(false);
    clearInterval(loadIntervalId);
    clearInterval(camIntervalId);
    await delay(1000);
    fgRef?.current?.zoomToFit(200);
  };

  const testData = async () => {
    const loadIntervalId = loadIntervalFunc();
    const camIntervalId = camIntervalFunc();
    if (data?.nodes) {
      setImgMaterial(getMatObj(data.nodes));
      setImgMaterialOutline(getMatObj(data.nodes, true));
      setSearchItems(data.nodes);
    }
    await delay(6000);
    setLoading(false);
    clearInterval(loadIntervalId);
    clearInterval(camIntervalId);
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
      setNodeHighlight(node.id);
    },
    [fgRef]
  );

  const handleHover = useCallback((node: Node | any) => {
    if (node?.id) {
      if (artistPreview && node.id == artistPreview.id) {
        return;
      }
      setArtistPreview(getNodePreview(node));
      setNodeHighlight(node.id);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    // getData();
    testData();

    return () => {
      window.removeEventListener("resize", updateSize);
      effect(() => setSignalThemeState(signalTheme.value));
    };
  }, []);

  const handleOnSelect = (item: any) => {
    zoomToNode(item);
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

  return (
    <>
      <div className="relative">
        {loading && (
          <div className="absolute flex justify-center text-center items-center z-40 w-full h-screen">
            <h1 className="select-none text-2xl bg-teal-200/75 dark:bg-teal-600/60 px-20 py-2 rounded-lg backdrop-blur-md horizontal-mask">
              Loading...
            </h1>
          </div>
        )}
        <div className="absolute top-14  left-0 right-0 m-auto z-[100] w-[60%] md:w-[40%] lg:w-[30%]">
          <ReactSearchAutocomplete
            items={searchItems}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            placeholder="Enter artist name"
            autoFocus
          />
        </div>
        <ForceGraph3D
          width={winSize.width}
          height={winSize.height}
          showNavInfo={false}
          backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
          linkColor={() => "#1db954"}
          linkOpacity={0.5}
          ref={fgRef}
          graphData={loading ? loadData : data}
          nodeLabel="name"
          onNodeClick={loading ? () => {} : zoomToNode}
          onNodeHover={loading ? () => {} : handleHover}
          nodeThreeObject={(node: Node | any) => {
            if (loading) {
              const geometry = new THREE.SphereGeometry(7, 10, 10);
              const material = new THREE.MeshBasicMaterial({
                color: signalThemeState == "dark" ? 0xffffff : 0x000000,
              });
              const sphere = new THREE.Mesh(geometry, material);
              return sphere;
            }
            let sphere = new THREE.Sprite(imgMaterial[node.id]);
            if (node.id == nodeHighlight) {
              sphere = new THREE.Sprite(imgMaterialOutline[node.id]);
            }
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
