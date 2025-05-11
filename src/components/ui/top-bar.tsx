import { FC, useState } from "react";
import { Menu, X } from "lucide-react";
import { SideBar } from "./side-bar";

interface TopBarProps {
  links: {
    to: string;
    label: string;
  }[];
}

export const TopBar: FC<TopBarProps> = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-lg z-50">
        <div className="flex flex-row items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-4 hover:text-primary-500 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <div className="flex flex-col">
              <h1 className="font-['Inter'] text-[16px] leading-[24px] font-medium text-[#0D171C] tracking-[0px]">
                The Birds App
              </h1>
              <p className="font-['Inter'] font-normal text-[14px] leading-[21px] tracking-[0px] text-[#607080]">
                By Copilot
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300 ease-in-out z-40 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <SideBar
          links={links}
          open={isMenuOpen}
          onLinkClick={() => setIsMenuOpen(false)}
        />
      </div>
    </>
  );
};
