import { create } from "zustand";
import { GroupingOption, OrderingOption, ITicket, IUser } from "../types/api";

interface KanbanState {
  grouping: GroupingOption;
  ordering: OrderingOption;
  tickets: ITicket[];
  users: IUser[];
  setGrouping: (grouping: GroupingOption) => void;
  setOrdering: (ordering: OrderingOption) => void;
  setTickets: (tickets: ITicket[]) => void;
  setUsers: (users: IUser[]) => void;
  getGroupedTickets: () => Record<string, ITicket[]>;
  getSortedTickets: (tickets: ITicket[]) => ITicket[];
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
  grouping: (localStorage.getItem("grouping") as GroupingOption) || "status",
  ordering: (localStorage.getItem("ordering") as OrderingOption) || "priority",
  tickets: [],
  users: [],
  setGrouping: (grouping) => {
    localStorage.setItem("grouping", grouping);
    set({ grouping });
  },
  setOrdering: (ordering) => {
    localStorage.setItem("ordering", ordering);
    set({ ordering });
  },
  setTickets: (tickets) => set({ tickets }),
  setUsers: (users) => set({ users }),
  getGroupedTickets: () => {
    const { tickets, users, grouping } = get();
    return tickets.reduce((acc, ticket) => {
      let key: string;
      switch (grouping) {
        case "user":
          key =
            users.find((user) => user.id === ticket.userId)?.name ||
            "Unassigned";
          break;
        case "priority":
          key = getPriorityLabel(ticket.priority);
          break;
        default:
          key = ticket.status;
      }
      return { ...acc, [key]: [...(acc[key] || []), ticket] };
    }, {} as Record<string, ITicket[]>);
  },
  getSortedTickets: (tickets) => {
    const { ordering } = get();
    return [...tickets].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority;
      } else {
        // title
        return a.title.localeCompare(b.title);
      }
    });
  },
}));

function getPriorityLabel(priority: number): string {
  switch (priority) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    default:
      return "No priority";
  }
}
