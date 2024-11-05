import "./display-options.css";
import React, { useState } from "react";
import { GroupingOption, OrderingOption } from "@/types/api";
import displayIcon from "@/assets/display.svg";
import downIcon from "@/assets/down.svg";
import { useKanbanStore } from "@/store/kanbanStore";

const DisplayOptions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { grouping, ordering, setGrouping, setOrdering } = useKanbanStore();

  return (
    <div className="display-options">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="display-button border-primary shadow-md font-medium"
      >
        <img src={displayIcon} alt="display icon" />
        Display
        <img src={downIcon} alt="down arrow" />
      </button>

      {isOpen && (
        <div className="options-dropdown shadow-md">
          <div className="option">
            <label htmlFor="grouping" className="text-light-gray">
              Grouping
            </label>
            <select
              id="grouping"
              value={grouping}
              className="border-primary"
              onChange={(e) => setGrouping(e.target.value as GroupingOption)}

            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option">
            <label htmlFor="ordering" className="text-light-gray">
              Ordering
            </label>
            <select
              className="border-primary"
              id="ordering"
              value={ordering}
              onChange={(e) =>
                setOrdering(e.target.value as OrderingOption)
              }
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
