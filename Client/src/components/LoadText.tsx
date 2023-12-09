export default function LoadText(props: { text: string }) {
  return (
    <div className="absolute flex justify-center text-center items-center z-[110] w-full max-h-screen">
      <h1 className="select-none text-2xl bg-teal-200/75 dark:bg-teal-600/60 px-20 py-2 rounded-lg backdrop-blur-md horizontal-mask">
        {props.text}
      </h1>
    </div>
  );
}
