import React from "react";
import { ITicket, IUser } from "@/types/api";
import "./ticket-card.css";

import highPriority from "@/assets/priority/high.svg";
import mediumPriority from "@/assets/priority/medium.svg";
import lowPriority from "@/assets/priority/low.svg";
import noPriority from "@/assets/priority/no-priority.svg";
import urgentPriority from "@/assets/priority/urgent-gray.svg";

interface TicketCardProps {
  ticket: ITicket;
  user?: IUser;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, user }) => {
  const getPriorityIcon = (priority: number) => {
    switch (priority) {
      case 4:
        return <img src={urgentPriority} alt="urgent priority" />;
      case 3:
        return <img src={highPriority} alt="high priority" />;
      case 2:
        return <img src={mediumPriority} alt="medium priority" />;
      case 1:
        return <img src={lowPriority} alt="low priority" />;
      default:
        return <img src={noPriority} alt="no priority" />;
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className={`user-avatar ${user.available ? "available" : ""}`}>
            {user.name[0]}
          </div>
        )}
      </div>
      <span className="ticket-title">{ticket.title}</span>
      <div className="ticket-tags">
        {getPriorityIcon(ticket.priority)}
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;
