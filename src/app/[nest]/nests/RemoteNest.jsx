import {Icon} from "@iconify/react";
import {useRef} from "react";
import {MinusIcon, PlusIcon, PowerIcon} from "../../components/BaseIcons";
import {BackArrow} from "../../FlareUI/FlareIcons";

export default function RemoteNest({nest}) {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-2">
      <div className="grid grid-cols-4 h-full gap-x-6 gap-y-4" style={{ gridAutoRows: "3rem" }}>
        <RemoteGrid display={nest.display} buttons={nest.buttons}/>
      </div>
    </div>
  )
}

function RemoteGrid({display, buttons}) {
  let grid = [];
  let parsed = parseDisplay(display);
  let i = 0;
  for (const current of parsed) {
    if (current.name === "") {
      grid.push(<div key={i}/>);
    } else {
      grid.push(<MakeElement key={i} data={buttons[current.name]} cols={current.cols} rows={current.rows}/>);
    }
    i++;
  }
  return grid;
}

function parseDisplay(display) {
  const rows = display.length;
  const cols = display[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const result = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (visited[r][c]) continue;

      const name = display[r][c];

      let colSpan = 1;
      let rowSpan = 1;

      if (name !== "") {
        while (c + colSpan < cols && display[r][c + colSpan] === name) colSpan++;
        while (r + rowSpan < rows && display[r + rowSpan][c] === name) rowSpan++;
      }

      for (let dr = 0; dr < rowSpan; dr++)
        for (let dc = 0; dc < colSpan; dc++)
          visited[r + dr][c + dc] = true;

      result.push({ name, cols: colSpan, rows: rowSpan });
    }
  }

  return result;
}

function MakeElement({data, cols, rows}) {
  if (data !== undefined)
    switch (data.type) {
      case "text_button":
      case "text":
      case "simple":
      case "basic":
        return (
          <div onClick={() => fetch(`/api/v1/devices/run?device=${data.action.device}&action=${data.action.action}`).catch(console.error)}
               className="bg-stone-200 cursor-pointer w-full drop-shadow-md rounded-3xl text-stone-800 font-mono flex items-center justify-center font-semibold uppercase text-md">
            <p>{data.text ? data.text : ""}</p>
            <p>{data.title ? data.title : ""}</p>
          </div>
        )
      case "power":
      case "off":
      case "on":
        return (
          <div className="flex items-center justify-center">
            <div onClick={() => fetch(`/api/v1/devices/run?device=${data.action.device}&action=${data.action.action}`).catch(console.error)}
                 className="bg-red-600 cursor-pointer h-full aspect-square drop-shadow-md rounded-full text-white font-mono flex items-center justify-center font-semibold uppercase text-3xl">
              <PowerIcon/>
            </div>
          </div>
        )
      case "stepper":
        return (
          <Stepper cols={cols} rows={rows} title={data.text} onTap={(direction) => {
            fetch(`/api/v1/devices/run?device=${data.actions[direction].device}&action=${data.actions[direction].action}`).catch(console.error);
          }}/>
        );
      case "trackpad":
        return <Trackpad cols={cols} rows={rows} onSwipe={(direction) => {
          fetch(`/api/v1/devices/run?device=${data.actions[direction].device}&action=${data.actions[direction].action}`).catch(console.error);
        }}/>;
      case "cross":
        return <Cross cols={cols} rows={rows} onTap={(direction) => {
          fetch(`/api/v1/devices/run?device=${data.actions[direction].device}&action=${data.actions[direction].action}`).catch(console.error);
        }}/>;
    }
  return (<div style={{gridRow: `span ${rows}`, gridColumn: `span ${cols}`}}/>)
}

function Stepper({id, title, cols, rows, onTap}) {
  return (
    <div style={{gridRow: `span ${rows}`, gridColumn: `span ${cols}`}} className="bg-stone-200 flex flex-col rounded-full p-2 justify-between items-stretch">
      <div onClick={() => onTap?.("up")} className="cursor-pointer bg-stone-100 aspect-square drop-shadow-md rounded-full text-stone-800 font-mono flex items-center justify-center font-semibold uppercase">
        <PlusIcon/>
      </div>
      <div className="text-stone-800 font-mono font-semibold text-sm text-center uppercase">
        {title ? title : "STEPPER"}
      </div>
      <div onClick={() => onTap?.("down")} className="cursor-pointer bg-stone-100 aspect-square drop-shadow-md rounded-full text-stone-800 font-mono flex items-center justify-center font-semibold uppercase">
        <MinusIcon/>
      </div>
    </div>
  )
}

function Trackpad({ id, onSwipe, cols, rows }) {
  const start = useRef(null);

  const handlePointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < 50) {
      onSwipe?.("tap");
    } else if (absDx > absDy) {
      onSwipe?.(dx > 0 ? "right" : "left");
    } else {
      onSwipe?.(dy > 0 ? "down" : "up");
    }

    start.current = null;
  };

  return (
    <div style={{gridRow: `span ${rows}`, gridColumn: `span ${cols}`}}
      className="bg-stone-200 rounded-3xl p-1 overflow-hidden" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          backgroundPosition: "0px 0px",
        }}
      />
    </div>
  );
}

function Cross({ onTap, cols, rows }) {
  const btns = [
    { label: <BackArrow className="rotate-90"/>, action: "up",    col: 2, row: 1, radius: "12px 12px 0 0" },
    { label: <BackArrow/>, action: "left",  col: 1, row: 2, radius: "12px 0 0 12px" },
    { label: <BackArrow className="rotate-180"/>, action: "right", col: 3, row: 2, radius: "0 12px 12px 0" },
    { label: <BackArrow className="-rotate-90"/>, action: "down",  col: 2, row: 3, radius: "0 0 12px 12px" },
  ];

  return (
    <div
      className="w-full h-full flex justify-center items-center"
      style={{
        gridRow: `span ${rows}`,
        gridColumn: `span ${cols}`,
        gap: "2px",
      }}
    >
      <div className="grid aspect-square h-full grid-cols-3 grid-rows-3">
        {btns.map(({ label, action, col, row, radius }) => (
          <button
            key={action}
            onClick={() => onPress?.(action)}
            style={{ gridColumn: col, gridRow: row, borderRadius: radius }}
            className="flex items-center justify-center bg-stone-200 text-sm transition-transform"
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => onPress?.("tap")}
          style={{ gridColumn: 2, gridRow: 2 }}
          className="flex items-center justify-center bg-stone-200 text-sm font-medium"
        >
          OK
        </button>

      </div>
    </div>
  );
}