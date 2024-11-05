import React from "react";
import { ITicket } from "../../types/api";
import { useKanbanStore } from "../../store/kanbanStore";
import TicketCard from "../ticket-card/ticket-card";
import "./ticket-column.css";
import threeDotMenuIcon from "@/assets/three-dot-menu.svg";
import addIcon from "@/assets/add.svg";

import highPriority from "@/assets/priority/high.svg";
import mediumPriority from "@/assets/priority/medium.svg";
import lowPriority from "@/assets/priority/low.svg";
import noPriority from "@/assets/priority/no-priority.svg";
import urgentPriority from "@/assets/priority/urgent.svg";

import backlogIcon from "@/assets/status/backlog.svg";
import todoIcon from "@/assets/status/to-do.svg";
import inProgressIcon from "@/assets/status/in-progress.svg";
import doneIcon from "@/assets/status/done.svg";
import cancelledIcon from "@/assets/status/cancelled.svg";

interface TicketColumnProps {
  name: string;
  tickets: ITicket[];
}


const TicketColumn: React.FC<TicketColumnProps> = ({ name, tickets }) => {
  const { users } = useKanbanStore();

  const getIcon = (name: string) => {
    switch (name) {
      case "Urgent":
        return <img src={urgentPriority} alt="urgent priority" />;
      case "High":
        return <img src={highPriority} alt="high priority" />;
      case "Medium":
        return <img src={mediumPriority} alt="medium priority" />;
      case "Low":
        return <img src={lowPriority} alt="low priority" />;
      case "No priority":
        return <img src={noPriority} alt="no priority" />;
      case "Backlog":
        return <img src={backlogIcon} alt="backlog" />;
      case "Todo":
        return <img src={todoIcon} alt="todo" />;
      case "In progress":
        return <img src={inProgressIcon} alt="in progress" />;
      case "Done":
        return <img src={doneIcon} alt="done" />;
      case "Cancelled":
        return <img src={cancelledIcon} alt="cancelled" />;
      default:
        return null;
    }
  };

  return (
    <div className="ticket-column">
      <h2 className="column-header">
        <div>
          {getIcon(name)}
          <span>{name}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div>
          <img src={addIcon} alt="add icon" />
          <img src={threeDotMenuIcon} alt="three dot menu" />
        </div>
      </h2>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            user={users.find((user) => user.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketColumn;
