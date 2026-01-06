import React from 'react';

export function BackIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={48} d="M244 400L100 256l144-144M120 256h292"></path></svg>);
}

export function TemperatureIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="currentColor" d="M2.5 5.5a1 1 0 1 1 2 0a1 1 0 0 1-2 0m1-2.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M11 4.5C9.401 4.5 8 5.76 8 8s1.401 3.5 3 3.5c.882 0 1.703-.382 2.263-1.101c.181-.233.446-.399.741-.399c.564 0 .954.565.644 1.036A4.3 4.3 0 0 1 11 13c-2.544 0-4.5-2.053-4.5-5S8.456 3 11 3c1.525 0 2.84.738 3.648 1.964c.31.471-.08 1.036-.644 1.036c-.295 0-.56-.166-.741-.399A2.83 2.83 0 0 0 11 4.5"></path></svg>);
}

export function HumidityIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M21.86 12.5A4.3 4.3 0 0 0 19 11c0-1.95-.68-3.6-2.04-4.96S13.95 4 12 4c-1.58 0-3 .47-4.25 1.43s-2.08 2.19-2.5 3.72c-1.25.28-2.29.93-3.08 1.95S1 13.28 1 14.58c0 1.51.54 2.8 1.61 3.85C3.69 19.5 5 20 6.5 20h12c1.25 0 2.31-.44 3.19-1.31c.87-.88 1.31-1.94 1.31-3.19q0-1.725-1.14-3M9.45 9.03c.78 0 1.42.64 1.42 1.42s-.64 1.42-1.42 1.42s-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42m5.1 7.94c-.78 0-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42s1.42.64 1.42 1.42s-.64 1.42-1.42 1.42M9.2 17L8 15.8L14.8 9l1.2 1.2z"></path></svg>);
}


export function AnimatedLoadingIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeDasharray={16} strokeDashoffset={16} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"></animate><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>);
}

export function LightingIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><defs><mask id="SVGDEO4Qc9R"><g fill="none"><path fill="#fff" d="m9.556 13.323l-.12-.01c-1.528-.14-2.292-.209-2.535-.732c-.242-.522.198-1.15 1.077-2.407l3.583-5.119c.581-.83.872-1.245 1.123-1.157c.25.089.216.594.15 1.605l-.204 3.049c-.062.92-.092 1.38.172 1.69c.265.31.724.351 1.642.435l.12.01c1.528.14 2.292.209 2.535.732c.242.522-.198 1.15-1.078 2.407l-3.582 5.119c-.581.83-.872 1.245-1.123 1.157c-.25-.089-.216-.594-.15-1.605l.204-3.049c.062-.92.092-1.38-.172-1.69c-.265-.31-.724-.351-1.642-.435"></path><path stroke="#c0c0c0" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.25} d="M18.5 4L17 6h2l-1.5 2m-11 8L5 18h2l-1.5 2"></path></g></mask></defs><path fill="currentColor" d="M0 0h24v24H0z" mask="url(#SVGDEO4Qc9R)"></path></svg>);
}

export function ControlMouseIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M17.65 14.75c.22-.37.35-.79.35-1.25a2.5 2.5 0 0 0-2.5-2.5c-1.3 0-2.5 1.08-2.5 2.5c0 .69.28 1.32.73 1.77l-1.41 1.41A4.46 4.46 0 0 1 11 13.5c0-.92.28-1.76.75-2.47c-.22.01-.44.02-.67.07a3.95 3.95 0 0 0-2.99 3.01c-.26 1.24.02 2.45.8 3.41c.77.94 1.9 1.48 3.11 1.48h6.53a1.472 1.472 0 0 0 .99-2.56zM17 18c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1" opacity={0.3}></path><circle cx={17} cy={17} r={1} fill="currentColor"></circle><path fill="currentColor" d="m20.86 14.97l-.93-.84c.48-3.45-2.87-6.04-6.05-4.82A5.8 5.8 0 0 0 12 9c-4.26 0-5.65 3.58-5.89 4.85A2.98 2.98 0 0 1 4 11c0-1.66 1.34-3 3-3h2.5a2.5 2.5 0 0 0 0-5H8c-.55 0-1 .45-1 1s.45 1 1 1h1.5c.28 0 .5.22.5.5s-.22.5-.5.5H7c-2.76 0-5 2.24-5 5c0 2.44 1.76 4.47 4.07 4.91A6 6 0 0 0 12 21h6.53c3.11 0 4.7-3.89 2.33-6.03M18.53 19H12c-1.21 0-2.34-.54-3.11-1.48c-.78-.95-1.06-2.16-.8-3.41a3.95 3.95 0 0 1 2.99-3.01c.22-.05.45-.06.67-.07c-.47.71-.75 1.55-.75 2.47c0 1.24.5 2.37 1.32 3.18l1.41-1.41c-.45-.45-.73-1.08-.73-1.77c0-1.42 1.2-2.5 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5c0 .46-.13.88-.35 1.25l1.87 1.7c.31.28.48.67.48 1.09c0 .8-.66 1.46-1.47 1.46"></path></svg>);
}

export function FeatherIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><path fill="currentColor" d="M467.14 44.84c-62.55-62.48-161.67-64.78-252.28 25.73c-78.61 78.52-60.98 60.92-85.75 85.66c-60.46 60.39-70.39 150.83-63.64 211.17l178.44-178.25c6.26-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94s24.6 9.37 33.98 0l66.1-66.03C159.42 454.65 279 457.11 353.95 384h-98.19l147.57-49.14c49.99-49.93 36.38-36.18 46.31-46.86h-97.78l131.54-43.8c45.44-74.46 34.31-148.84-16.26-199.36"></path></svg>);
}

export function PlusIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512" {...props}><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"></path></svg>);
}

export function EditIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...props}><path fill="currentColor" fillOpacity={0.15} d="M761.1 288.3L687.8 215L325.1 577.6l-15.6 89l88.9-15.7z"></path><path fill="currentColor" d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32m-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9m67.4-174.4L687.8 215l73.3 73.3l-362.7 362.6l-88.9 15.7z"></path></svg>);
}

export function DeleteIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M8 9h8v10H8z" opacity={0.3}></path><path fill="currentColor" d="m15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8z"></path></svg>);
}