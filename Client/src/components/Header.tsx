import { MY_NETWORK_BTN_TEXT, APP_NAME } from "@/constants";
import Link from "next/link";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export default function Header(props: {
  className?: string;
  showHomeBtn?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 mx-7 pt-5 " +
          (props.showHomeBtn === true ? "justify-between" : "justify-end"),
        props.className
      )}>
      {props.showHomeBtn && (
        <Link
          className="md:p-0 p-2 rounded-3xl md:rounded-none bg-primary text-primary-foreground md:text-primary md:bg-transparent"
          href={"/"}>
          <h1 className="text-lg hidden md:block py-2">{APP_NAME}</h1>
          <Home className="md:hidden" />
        </Link>
      )}

      <div className="flex gap-3">
        <ThemeToggle className="rounded-[2rem]" />
        {/* <Link
          className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-3 rounded-3xl font-medium my-[0.15rem]"
          href={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/spotify/askAuth`}>
          {MY_NETWORK_BTN_TEXT}
        </Link> */}
      </div>
    </div>
  );
}
