import { APP_NAME } from "@/constants/AppConstants";
import Link from "next/link";
import { Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import cn from "@/utils/cn";

export default function Header(props: {
  className?: string;
  showHomeBtn?: boolean;
}) {
  return (
    <section
      className={cn(
        "mx-7 flex gap-3 pt-5 " +
          (props.showHomeBtn === true ? "justify-between" : "justify-end"),
        props.className
      )}>
      {props.showHomeBtn && (
        <Link
          className="rounded-3xl bg-primary p-2 text-primary-foreground hover:bg-[#1DB954] md:rounded-none md:bg-transparent md:p-0 md:text-primary md:hover:bg-transparent"
          href={"/"}>
          <h1 className="hidden py-2 text-lg hover:text-[#1DB954] md:block">
            {APP_NAME}
          </h1>
          <Home className="md:hidden" />
        </Link>
      )}
      <ThemeToggle className="mx-5 rounded-[2rem] px-5" />
    </section>
  );
}
