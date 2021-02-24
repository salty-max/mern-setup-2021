import React from 'react';
import cx from 'classnames';

function App() {
  const [toggle, setToggle] = React.useState<boolean>(false);

  const buttonClasses = cx({
    'bg-red hover:bg-red-dark': toggle,
    'bg-blue hover:bg-blue-dark': !toggle,
  });

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <button className={`p-3 rounded-sm ${buttonClasses}`} onClick={() => setToggle(!toggle)}>
        Toggle
      </button>
    </div>
  );
}

export default App;
