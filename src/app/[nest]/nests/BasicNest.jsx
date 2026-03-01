import {WrapToButton} from "@/app/[nest]/elements/BasicButtons";
import {WrapToData} from "@/app/[nest]/elements/BasicData";

export default function BasicNest({nest}) {
  let data = [];
  nest.data.forEach(element => data.push(
    <WrapToData key={element.id} data={element}/>
  ));
  let buttons = [];
  nest.buttons.forEach(element => buttons.push(
    <WrapToButton key={element.id} data={element}/>
  ));
  return (
    <div className="flex flex-col w-full px-4 gap-2">
      <div className="grid grid-cols-2 gap-3">
        {data}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {buttons}
      </div>
    </div>
  )
}