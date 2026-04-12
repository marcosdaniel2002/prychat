"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  children?: React.ReactNode;
}

function LinkSideBarDesktop({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={
        isActive
          ? "flex items-center gap-4 px-8 py-4 bg-[#a8f692] text-[#012200] rounded-r-[1.5rem] font-semibold transition-all translate-x-1 duration-300"
          : "flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
      }
      href={href}
    >
      {children}
    </Link>
  );
}

export default LinkSideBarDesktop;
