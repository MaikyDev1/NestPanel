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