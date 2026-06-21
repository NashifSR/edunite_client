import React from "react";
import ButtonDesigns from "@/app/Components/ButtonDesigns";

const TimerSelector = ({ options, onSelect, selected }) => {
  const timerOptions = options || [30, 15, 10, 1, 0];

  return (
    <div className="flex gap-4 mb-6">
      {timerOptions.map((sec) => (
        <ButtonDesigns
          key={sec}
          label={sec === 0 ? "No Timer" : `${sec} sec-Q`}
          variant={selected === sec ? "primary" : "soft"}
          onClick={() => onSelect(sec)}
        />
      ))}
    </div>
  );
};

export default TimerSelector;
