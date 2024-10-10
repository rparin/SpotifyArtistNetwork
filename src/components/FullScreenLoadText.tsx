import cn from "@/utils/cn";

export default function FullScreenLoadText(props: {
  text: string;
  classname?: string;
}) {
  return (
    <div className="absolute z-[110] flex max-h-screen w-full items-center justify-center text-center">
      <h1
        className={cn(
          "horizontal-mask select-none rounded-lg bg-teal-200/75 px-20 py-2 text-2xl backdrop-blur-md dark:bg-teal-600/60",
          props.classname
        )}>
        {props.text}
      </h1>
    </div>
  );
}
