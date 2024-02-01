

export const todosList = [
  {
    id: 101,
    groupName: "Backlog",
    tasks: [
      { id: 1, title: "Test-1", date: Date(Date.now()).slice(0, 15) },
      { id: 2, title: "Test-2", date: Date(Date.now()).slice(0, 15) },
    ],
  },
  {
    id: 102,
    groupName: "Todo",
    tasks: [
      { id: 3, title: "Test-3", date: Date(Date.now()).slice(0, 15) },
      { id: 4, title: "Test-4", date: Date(Date.now()).slice(0, 15) },
    ],
  },
  {
    id: 103,
    groupName: "Ongoing",
    tasks: [
      { id: 5, title: "Test-5", date: Date(Date.now()).slice(0, 15) },
      { id: 6, title: "Test-6", date: Date(Date.now()).slice(0, 15) },
    ],
  },
  {
    id: 104,
    groupName: "Done",
    tasks: [
      { id: 7, title: "Test-7", date: Date(Date.now()).slice(0, 15) },
      { id: 8, title: "Test-8", date: Date(Date.now()).slice(0, 15) },
    ],
  },
];
