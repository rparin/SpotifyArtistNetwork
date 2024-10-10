import dynamic from "next/dynamic";

const LoadingForceGraph = dynamic(
  () => import("../LoadingGraph/LoadingGraph"),
  {
    ssr: false,
  }
);

export default LoadingForceGraph;
