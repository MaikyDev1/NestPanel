import {HomeNavigationIcon} from "@/app/FlareUI/FlareIcons";
import {createContext, useContext, useMemo, useState} from "react";
import React from 'react';
import Link from "next/dist/client/link";

const MobileNavContext = createContext(0, undefined);

export function MobileNavigation({defaultActive = 0, children}) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div className="relative bottom-0 w-full p-2">
        <MobileNavContext.Provider value={{ active, setActive }} className="">
            <nav className="p-2 rounded-2xl flex justify-between bg-stone-800">
                {children}
            </nav>
        </MobileNavContext.Provider>
    </div>
  );
}

export function MobileNavigationElement({icon, href, onClick, index}) {
  const { active, setActive } = useContext(MobileNavContext);
  return (
    <Link href={href ? href : "/"} onClick={() => {onClick?.()}
    } className={`text-4xl p-2 rounded-2xl transition-all duration-300 ease-out active:scale-95 ${active === index ? "bg-white text-rose-400 scale-110 shadow-md" : "text-white"}`}>
      {icon}
    </Link>
  )
}
