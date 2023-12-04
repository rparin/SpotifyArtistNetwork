import dynamic from "next/dynamic";

const MyNetworkGraph = dynamic(() => import("./MyGraph"), {
  ssr: false,
});

export default MyNetworkGraph;
