import dynamic from "next/dynamic";

const UserForceGraph = dynamic(() => import("./MyGraph"), {
  ssr: false,
});

export default UserForceGraph;
