export interface IUser {
  id: string;
  name: string;
  available: boolean;
}

export interface ITicket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: Status;
  priority: Priority;
}

export interface IApiResponse {
  users: IUser[];
  tickets: ITicket[];
}

export enum Status {
  Backlog = "Backlog",
  Todo = "Todo",
  InProgress = "In progress",
}

export enum Priority {
  NoPriority = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

export type GroupingOption = "status" | "user" | "priority";
export type OrderingOption = "priority" | "title";

export const PriorityLabels: Record<Priority, string> = {
  [Priority.Urgent]: "Urgent",
  [Priority.High]: "High",
  [Priority.Medium]: "Medium",
  [Priority.Low]: "Low",
  [Priority.NoPriority]: "No priority",
};

export const StatusPriority: Record<Status, number> = {
  [Status.InProgress]: 2,
  [Status.Todo]: 1,
  [Status.Backlog]: 0,
};
