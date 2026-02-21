import {HomeNavigationIcon} from "@/app/FlareUI/FlareIcons";
import {createContext, useContext, useMemo, useState} from "react";
import React from 'react';

const MobileNavContext = createContext(0, undefined);

export function MobileNavigation({defaultActive = 0, children}) {
  const [active, setActive] = useState(defaultActive);
  return (
    <MobileNavContext.Provider value={{ active, setActive }} className="absolute bottom-0 p-3 md:w-1/4 w-full">
      <nav className="p-2 rounded-2xl flex justify-between bg-stone-800">
        {children}
      </nav>
    </MobileNavContext.Provider>
  );
}

export function MobileNavigationElement({icon, onClick, index}) {
  const { active, setActive } = useContext(MobileNavContext);
  return (
    <div onClick={() => {setActive(index); onClick?.()}} className={`text-5xl p-2 rounded-2xl transition-all duration-300 ease-out active:scale-95 ${active === index ? "bg-white text-rose-400 scale-110 shadow-md" : "text-white"}`}>
      {icon}
    </div>
  )
}
