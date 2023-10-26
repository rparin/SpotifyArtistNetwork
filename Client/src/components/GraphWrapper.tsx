import dynamic from "next/dynamic";

const ForceGraph = dynamic(() => import("../components/Graph"), {
  ssr: false,
});

export default ForceGraph;
