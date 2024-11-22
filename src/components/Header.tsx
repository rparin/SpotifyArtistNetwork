import { APP_NAME } from "@/constants/AppConstants";
import Link from "next/link";
import { Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import cn from "@/utils/cn";

export default function Header(props: {
  className?: string;
  showHomeLink?: boolean;
}) {
  return (
    <header
      className={cn(
        "mx-7 flex gap-3 pt-4 " +
          (props.showHomeLink === true ? "justify-between" : "justify-end"),
        props.className
      )}>
      {props.showHomeLink && (
        <Link
          className="rounded-3xl bg-primary p-2 text-primary-foreground hover:bg-[#1DB954] md:rounded-none md:bg-transparent md:p-0 md:text-primary md:hover:bg-transparent"
          href={"/"}>
          <h1 className="hidden py-2 text-base font-bold hover:text-[#1DB954] md:block">
            {APP_NAME}
          </h1>
          <h1 className="md:hidden">
            <Home />
          </h1>
        </Link>
      )}
      <ThemeToggle className="rounded-[2rem] md:mx-5 md:px-5" />
    </header>
  );
}
