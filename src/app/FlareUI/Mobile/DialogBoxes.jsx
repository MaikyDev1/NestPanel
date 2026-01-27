import {useRef, useState} from "react";
import {HorizontalLine} from "@/app/FlareUI/FlareIcons";

export function DraggableDialogBox({children, onClose}) {
  const startY = useRef(0);
  const currentY = useRef(0);
  const [dragging, setDragging] = useState(false);
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };
  const handleTouchMove = (e) => {
    if (!dragging) return;
    currentY.current = e.touches[0].clientY - startY.current;

    if (currentY.current > 0) {
      e.currentTarget.style.transform = `translateY(${currentY.current}px)`;
    }
  };
  const handleTouchEnd = (e) => {
    setDragging(false);
    if (currentY.current > 120) {
      onClose();
    } else {
      e.currentTarget.style.transform = "translateY(0)";
    }
    currentY.current = 0;
  };

  return (
    <main className={`z-10 absolute left-0 h-screen w-screen flex flex-col justify-end items-center bg-black/50`}>
      <div className="md:w-1/4 w-full animate-slide-up rounded-t-[30px] pb-10 pt-2 flex flex-col justify-between items-center bg-white shadow-2xl"
           onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <HorizontalLine className="text-3xl text-gray-300 mb-1"/>
        {children}
      </div>
    </main>
  )

}