export default function GraphError(props: { errorMsg: string }) {
  return (
    <div className="flex h-screen justify-center text-center items-center">
      <h2 className="flex flex-col text-base">
        <span className="text-lg font-semibold">{props.errorMsg}</span>
        <span className="font-normal">Please try again at a later time</span>
      </h2>
    </div>
  );
}
