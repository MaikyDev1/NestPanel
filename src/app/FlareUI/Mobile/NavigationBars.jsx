import {HomeNavigationIcon} from "@/app/FlareUI/FlareIcons";
import {useState} from "react";

export function MobileNavigation() {
  const [active, setActive] = useState(1);

  const base =
    "text-5xl p-2 rounded-2xl transition-all duration-300 ease-out active:scale-95";

  const activeClass = "bg-white text-rose-400 scale-110 shadow-md";

  return (
    <div className="absolute bottom-0 p-3 md:w-1/4 w-full">
      <nav className="p-2 rounded-2xl flex justify-between bg-stone-800">
        {[1, 2, 3, 4].map((i) => (
          <HomeNavigationIcon
            key={i}
            onClick={() => setActive(i)}
            className={`${base} ${active === i ? activeClass : "text-white"}`}
          />
        ))}
      </nav>
    </div>
  );
}

export function MobileNavigationElement({icon}) {
  return (
    <div className="">
      {icon}
    </div>
  )
}
