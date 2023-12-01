"use client";
import { useRouter } from "next/navigation";
import { useCountdown } from "@/hooks/useCountdown";

export default function CountdownNavigateTo(props: {
  href: string;
  countdown: number;
}) {
  const router = useRouter();
  const ct = useCountdown(props.countdown, () => {
    router.push(props.href);
  });
  return <span>{ct / 1000}</span>;
}
