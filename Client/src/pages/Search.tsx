import { APP_NAME, SEARCH_PLACEHOLDER } from "@/constants";

export default function Search() {
  return (
    <>
      <div className="h-[70vh] flex flex-col justify-center items-center gap-7">
        <h1 className="text-3xl md:text-5xl">{APP_NAME}</h1>
        <input
          className="rounded-[7rem] h-14 px-7 w-[80%] lg:w-[50%] text-sm md:text-base shadow-lg focus:shadow-xl outline outline-black outline-2 dark:outline-white dark:bg-background"
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
        />
      </div>
    </>
  );
}
