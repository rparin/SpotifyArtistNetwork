import Image from "next/image";

export default function GraphSearchResult(props: any) {
  return (
    <>
      <div className="flex gap-3">
        <Image
          className="h-7 w-7 object-cover rounded-[50%]"
          width={100}
          height={100}
          src={props.img}
          alt={`${props.name} Spotify profile pic`}
        />
        {props.name}
      </div>
    </>
  );
}
