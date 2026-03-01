import React from 'react';

export function HorizontalLine(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}><path fill="currentColor" fillRule="evenodd" d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1" clipRule="evenodd"></path></svg>);
}

export function CogIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M11 10.27L7 3.34m4 10.39l-4 6.93M12 22v-2m0-18v2m2 8h8m-5 8.66l-1-1.73m1-15.59l-1 1.73M2 12h2m16.66 5l-1.73-1m1.73-9l-1.73 1M3.34 17l1.73-1M3.34 7l1.73 1"></path><circle cx={12} cy={12} r={2}></circle><circle cx={12} cy={12} r={8}></circle></g></svg>);
}

export function HomeNavigationIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 3s-6.186 5.34-9.643 8.232A1.04 1.04 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1a.98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3"></path></svg>);
}

export function TimeNavigationIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m1-14.5a1 1 0 1 0-2 0v5.25c0 .69.56 1.25 1.25 1.25h3.25a1 1 0 1 0 0-2H13z" clipRule="evenodd"></path></svg>);
}

export function AccountIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><circle cx={12} cy={6} r={4} fill="currentColor"></circle><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"></path></svg>);
}

export function MoreActionsDots(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path></svg>);
}

export function VerticalDots(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path></svg>);
}

export function EditPenIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M20.71 7.04c-.34.34-.67.67-.68 1c-.03.32.31.65.63.96c.48.5.95.95.93 1.44s-.53 1-1.04 1.5l-4.13 4.14L15 14.66l4.25-4.24l-.96-.96l-1.42 1.41l-3.75-3.75l3.84-3.83c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25l9.56-9.57l3.75 3.75L6.75 21H3z"></path></svg>);
}

export function DeleteIcon(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>);
}

export function BackArrow(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 24" {...props}><path fill="currentColor" fillRule="evenodd" d="M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5L10 4.563L2.682 12z"></path></svg>);
}

export function IconByTemperature({className, temperature}) {
  if (temperature <= -10) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" className={className}><path fill="#88c9f9" d="M19 27.586V8.415l4.828-4.829s.707-.707 0-1.415c-.707-.707-1.414 0-1.414 0L19 5.586V1s0-1-1-1s-1 1-1 1v4.586l-3.414-3.415s-.707-.707-1.414 0c-.707.708 0 1.415 0 1.415L17 8.415v19.171l-4.828 4.828s-.707.707 0 1.414s1.414 0 1.414 0L17 30.414V35s0 1 1 1s1-1 1-1v-4.586l3.414 3.414s.707.707 1.414 0s0-1.414 0-1.414z"></path><path fill="#88c9f9" d="M34.622 20.866c-.259-.966-1.225-.707-1.225-.707l-6.595 1.767l-16.603-9.586l-1.767-6.595s-.259-.966-1.225-.707S6.5 6.263 6.5 6.263l1.25 4.664l-3.972-2.294s-.866-.5-1.366.366s.366 1.366.366 1.366l3.971 2.293l-4.664 1.249s-.967.259-.707 1.225c.259.967 1.225.708 1.225.708l6.596-1.767l16.603 9.586l1.767 6.596s.259.966 1.225.707c.966-.26.707-1.225.707-1.225l-1.25-4.664l3.972 2.293s.867.5 1.367-.365c.5-.867-.367-1.367-.367-1.367l-3.971-2.293l4.663-1.249c0-.001.966-.26.707-1.226"></path><path fill="#88c9f9" d="m33.915 13.907l-4.664-1.25l3.972-2.293s.867-.501.367-1.367c-.501-.867-1.367-.366-1.367-.366l-3.971 2.292l1.249-4.663s.259-.966-.707-1.225s-1.225.707-1.225.707l-1.767 6.595l-16.604 9.589l-6.594-1.768s-.966-.259-1.225.707c-.26.967.707 1.225.707 1.225l4.663 1.249l-3.971 2.293s-.865.501-.365 1.367c.5.865 1.365.365 1.365.365l3.972-2.293l-1.25 4.663s-.259.967.707 1.225c.967.26 1.226-.706 1.226-.706l1.768-6.597l16.604-9.585l6.595 1.768s.966.259 1.225-.707c.255-.967-.71-1.225-.71-1.225"></path></svg>);
  }
  if (temperature <= 0) {

  }
  if (temperature <= 30) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" className={className}><g fill="none"><path fill="#ff822d" d="M13.638 3.202a2.936 2.936 0 0 1 4.724 0a2.94 2.94 0 0 0 3.25 1.055a2.936 2.936 0 0 1 3.822 2.778a2.94 2.94 0 0 0 2.008 2.763a2.936 2.936 0 0 1 1.46 4.494a2.94 2.94 0 0 0 0 3.416a2.936 2.936 0 0 1-1.46 4.494a2.94 2.94 0 0 0-2.008 2.763a2.936 2.936 0 0 1-3.823 2.778a2.94 2.94 0 0 0-3.249 1.055a2.936 2.936 0 0 1-4.724 0a2.94 2.94 0 0 0-3.25-1.055a2.936 2.936 0 0 1-3.822-2.778a2.94 2.94 0 0 0-2.008-2.763a2.936 2.936 0 0 1-1.46-4.494a2.94 2.94 0 0 0 0-3.416a2.936 2.936 0 0 1 1.46-4.494a2.94 2.94 0 0 0 2.008-2.763a2.936 2.936 0 0 1 3.823-2.778a2.94 2.94 0 0 0 3.249-1.055"></path><path fill="#fcd53f" d="M25.062 21.232c-2.89 5.005-9.29 6.72-14.294 3.83s-6.72-9.29-3.83-14.294s9.29-6.72 14.294-3.83s6.72 9.29 3.83 14.294"></path></g></svg>);
  }
  if (temperature >= 45) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64" className={className}><path fill="#ff9d33" d="M57 26.2s-3 2.8-8.1 6.1C47.5 24.2 43.6 14.2 36 2c0 0-2.5 13.1-10.8 25.4c-3.6-5.6-5.2-10-5.2-10C-6 43.5 15.6 62 29.2 62c17.4 0 32.7-8.4 27.8-35.8"></path><path fill="#ffce31" d="M46.7 49.4c1.5-3.3 2.6-7.6 2.8-13c0 0-2.1 1.8-5.7 4.1c-1-5.4-3.7-12-9-20.2c0 0-1.7 8.7-7.5 17c-2.5-3.7-3.6-6.7-3.6-6.7c-4.3 6.8-6 12.2-6.1 16.5c-2.4-.9-3.9-1.6-3.9-1.6c4.1 12.2 12.6 14.9 16.4 14.9c6.8 0 13.7-2 20.5-11.7c0-.1-1.5.3-3.9.7"></path><path fill="#ffdf85" d="M21.9 43.9s2.8 3.8 4.9 2.9c0 0 4-6.3 9.8-9.8c0 0-1.2 9.6.2 11.3c1.8 2.3 6.7-2.5 6.7-2.5c0 5.7-6.2 12.8-11.8 12.8c-5.4 0-13.2-6.2-9.8-14.7"></path><path fill="#ff9d33" d="M49.8 18.1c2.1-3 3.5-6.2 3.5-6.2c3.5 5.8 1.4 9.3-.1 10.4c-2.1 1.6-5.8-.7-3.4-4.2m-38.2-1c-2.1-3.5-2.3-7.9-2.3-7.9c-5 7.5-3.1 11.7-1.4 12.9c2.2 1.7 6-.9 3.7-5m11.6-7.8c.3-2.4-.7-4.8-.7-4.8c4.7 3.1 4.7 5.7 4.1 6.8c-.9 1.3-3.7.7-3.4-2"></path></svg>);
  }
}