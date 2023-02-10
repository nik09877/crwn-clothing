// import { useState } from 'react';

//create your forceRender hook
export const useForceRender = () => {
  // const [value, setValue] = useState(0); // integer state
  // return () => setValue((value) => value + 1);
  return () => window.location.reload(false);

  // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
};
