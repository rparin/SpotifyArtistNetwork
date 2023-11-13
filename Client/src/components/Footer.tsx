import { FOOTER_LOGIN_TEXT, FOOTER_SEARCH_TEXT, CR } from "@/constants";
export default function Footer() {
  return (
    <div className="bg-black text-white absolute bottom-0 left-0 right-0 mx-auto flex flex-col items-center gap-2 py-3">
      <section className="flex gap-5 text-sm">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2">
          <p>{FOOTER_SEARCH_TEXT}</p>
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2">
          <p>{FOOTER_LOGIN_TEXT}</p>
        </a>
      </section>
      <p className="text-white/30 text-xs">{CR}</p>
    </div>
  );
}
