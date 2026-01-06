import {WrapToButton} from "@/app/components/nests/basic_elements/BasicButtons";
import {WrapToData} from "@/app/components/nests/basic_elements/BasicData";

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
    <div className="bg-white pt-2 rounded-t-2xl flex flex-col flex-grow">
      <div className="flex flex-col  w-full p-2">
        <h1 className="text-neutral-900 font-thin text-lg ml-2">Data</h1>
        <div className="grid grid-cols-2 gap-3">
          {data}
        </div>
        <h1 className="text-neutral-900 text-lg font-thin ml-2">Buttons</h1>
        <div className="grid grid-cols-2 gap-3">
          {buttons}
        </div>
      </div>
    </div>
  )
}