import React, { useEffect } from "react";
import { useData } from "../../hooks/useData";
import { useKanbanStore } from "../../store/kanbanStore";
import TicketColumn from "../ticket-column/ticket-column";
import "./kanban-board.css";
import { GroupingOption, ITicket } from "@/types/api";

const sortColumns = (
  groupingOption: GroupingOption,
  columns: [string, ITicket[]][]
) => {
  if (groupingOption === "status") {
    const inProgress = columns.find(
      (column) => column[0] === "In progress"
    ) ?? ["In progress", []];
    const todo = columns.find((column) => column[0] === "Todo") ?? ["Todo", []];
    const backlog = columns.find((column) => column[0] === "Backlog") ?? [
      "Backlog",
      [],
    ];

    return [inProgress, todo, backlog];
  } else if (groupingOption === "priority") {
    const urgent = columns.find((column) => column[0] === "Urgent") ?? [
      "Urgent",
      [],
    ];
    const high = columns.find((column) => column[0] === "High") ?? ["High", []];
    const medium = columns.find((column) => column[0] === "Medium") ?? [
      "Medium",
      [],
    ];
    const low = columns.find((column) => column[0] === "Low") ?? ["Low", []];
    const noPriority = columns.find(
      (column) => column[0] === "No priority"
    ) ?? ["No priority", []];
    return [noPriority, low, medium, high, urgent];
  } else if (groupingOption === "user") {
    return columns.sort((a, b) => a[0].localeCompare(b[0]));
  } else {
    return columns;
  }
};

const KanbanBoard: React.FC = () => {
  const { data, loading, error } = useData();
  const {
    setTickets,
    setUsers,
    getGroupedTickets,
    getSortedTickets,
    grouping,
  } = useKanbanStore();

  useEffect(() => {
    if (data) {
      setTickets(data.tickets);
      setUsers(data.users);
    }
  }, [data, setTickets, setUsers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const groupedTickets = getGroupedTickets();
  const sortedAndGroupedTickets = Object.entries(groupedTickets).reduce(
    (acc, [key, tickets]) => {
      return { ...acc, [key]: getSortedTickets(tickets) };
    },
    {} as Record<string, ITicket[]>
  );

  const sortedColumns = sortColumns(
    grouping,
    Object.entries(sortedAndGroupedTickets)
  );

  return (
    <div className="kanban-board">
      <div className="kanban-columns">
        {sortedColumns.map((data, i) => {
          return (
            <TicketColumn
              key={i}
              name={data[0] as string}
              tickets={data[1] as ITicket[]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
