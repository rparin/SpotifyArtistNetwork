import dynamic from "next/dynamic";

const UserForceGraph = dynamic(() => import("../UserGraph/UserGraph"), {
  ssr: false,
});

export default UserForceGraph;
