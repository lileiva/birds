import { FC } from "react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

interface SideBarProps {
  links: {
    to: string;
    label: string;
  }[];
  open?: boolean;
  onLinkClick?: () => void;
}

export const SideBar: FC<SideBarProps> = ({
  links,
  open = false,
  onLinkClick,
}) => {
  return (
    <aside
      className={clsx(
        `shadow-lg
        transition-all duration-300 ease-in-out
        md:w-64 md:translate-x-0
        bg-[#FBFCFF]
      border-[#D5DADF]
        border-r
        h-full
        min-h-screen
    `,
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4 space-y-4">
        <div className="flex flex-col">
          <h1 className="font-['Inter'] text-[16px] leading-[24px] font-medium text-[#0D171C] tracking-[0px]">
            The Birds App
          </h1>
          <p className="font-['Inter'] font-normal text-[14px] leading-[21px] tracking-[0px] text-[#607080]">
            By Copilot
          </p>
        </div>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            className="block py-2 px-3 text-[14px] leading-[21px] rounded-lg hover:font-semibold [&.active]:font-semibold [&.active]:bg-[hsla(213,37%,48%,0.08)] hover:bg-[hsla(213,37%,48%,0.08)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
