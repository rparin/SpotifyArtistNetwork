import { MY_NETWORK_BTN_TEXT } from "@/constants";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { Button } from "@/components/UI/button";
import { cn } from "@/lib/utils";

export default function Header(props: { className?: string }) {
  return (
    <div className={cn("flex justify-end gap-3 mx-5 pt-5", props.className)}>
      <ThemeToggle className="rounded-[2rem]" />
      <Button variant="default" className="rounded-[2rem]">
        {MY_NETWORK_BTN_TEXT}
      </Button>
    </div>
  );
}
