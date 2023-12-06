import { MY_NETWORK_BTN_TEXT } from "@/constants";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Header(props: { className?: string }) {
  return (
    <div className={cn("flex justify-end gap-3 mx-5 pt-5", props.className)}>
      <ThemeToggle className="rounded-[2rem]" />

      <Link
        className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 rounded-3xl font-medium"
        href={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/spotify/askAuth`}>
        {MY_NETWORK_BTN_TEXT}
      </Link>
    </div>
  );
}
