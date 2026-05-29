// A simple implementation of a signal (reactive state) in vanilla JavaScript, inspired by SolidJS's createSignal.
// If used a lot and want more concise naming without conflicting.. useSignal ? newSignal ?

function createVanillaSignal(initialValue) {
  let state = initialValue; // The hidden data (closure)

  function accessor() {
    return state;
  }

  function setter(newValue) {
    // Is the user passing a callback function? e.g. (prev) => ...
    if (typeof newValue === 'function') {
      // Run their function, pass in the current state, and save the result
      state = newValue(state);
    } else {
      // Otherwise, just overwrite it directly
      state = newValue;
    }
  }

  return [accessor, setter];
}

/* USAGE: 

const [count, setCount] = createSignal(0);

1. Direct assignment:

    setCount(5);
    console.log(count()); // Output: 5

2. Using "prev" (passing a function):

    setCount((prev) => prev + 1);
    console.log(count()); // Output: 6 
    
*/
