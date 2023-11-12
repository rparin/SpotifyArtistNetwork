import { APP_NAME, SEARCH_PLACEHOLDER, MY_NETWORK_BTN_TEXT } from "@/constants";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { Button } from "@/components/UI/button";

export default function Landing() {
  return (
    <>
      {/* Buttons */}
      <div className="flex justify-end gap-3 mx-5 mt-5">
        <ThemeToggle className="rounded-[2rem]" />

        <Button variant="default" className=" rounded-[2rem]">
          {MY_NETWORK_BTN_TEXT}
        </Button>
      </div>

      {/* Search Area */}
      <div className="">
        <h1>{APP_NAME}</h1>
        <input
          className="rounded-xl"
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
        />
      </div>
    </>
  );
}
