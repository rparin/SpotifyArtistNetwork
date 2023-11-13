import { MY_NETWORK_BTN_TEXT } from "@/constants";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { Button } from "@/components/UI/button";

export default function Header() {
  return (
    <div className="flex justify-end gap-3 mx-5 pt-5">
      <ThemeToggle className="rounded-[2rem]" />
      <Button variant="default" className="rounded-[2rem]">
        {MY_NETWORK_BTN_TEXT}
      </Button>
    </div>
  );
}
