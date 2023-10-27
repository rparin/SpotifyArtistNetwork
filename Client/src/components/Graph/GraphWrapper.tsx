import dynamic from "next/dynamic";

const ForceGraph = dynamic(() => import("../Graph/Graph"), {
  ssr: false,
});

export default ForceGraph;
