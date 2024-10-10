"use client";
import { useCountdown } from "@/hooks/useCountdown";
import { useRouter } from "next/navigation";

export default function CountdownNavigateTo(props: {
  href: string;
  countdown: number;
  className?: string;
}) {
  const router = useRouter();
  const ct = useCountdown(props.countdown, () => {
    router.push(props.href);
  });
  return <span className={props.className}>{ct / 1000}</span>;
}
