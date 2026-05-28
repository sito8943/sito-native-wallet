import { INITIAL_ACCOUNTS } from "#shared/accounts"
import { INITIAL_CATEGORIES } from "#shared/categories"

import { type Transaction } from "./Transaction"

const [salary, food, transport, home] = INITIAL_CATEGORIES

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    description: "Monthly salary",
    amount: 2150,
    account: INITIAL_ACCOUNTS[0],
    categories: [salary],
    date: "2026/05/24",
  },
  {
    id: "2",
    description: "Groceries",
    amount: 54.12,
    account: INITIAL_ACCOUNTS[0],
    categories: [food, home],
    date: "2026/05/23",
  },
  {
    id: "3",
    description: "Metro card",
    amount: 8.4,
    account: INITIAL_ACCOUNTS[1],
    categories: [transport],
    date: "2026/05/22",
  },
  {
    id: "4",
    description: "Savings transfer",
    amount: 200,
    account: INITIAL_ACCOUNTS[2],
    categories: [home],
    date: "2026/05/20",
  },

  // Extra examples

  {
    id: "5",
    description: "Coffee with friends",
    amount: 6.5,
    account: INITIAL_ACCOUNTS[0],
    categories: [food],
    date: "2026/05/19",
  },
  {
    id: "6",
    description: "Electricity bill",
    amount: 73.2,
    account: INITIAL_ACCOUNTS[0],
    categories: [home],
    date: "2026/05/18",
  },
  {
    id: "7",
    description: "Bus ticket",
    amount: 2.55,
    account: INITIAL_ACCOUNTS[1],
    categories: [transport],
    date: "2026/05/18",
  },
  {
    id: "8",
    description: "Freelance payment",
    amount: 480,
    account: INITIAL_ACCOUNTS[0],
    categories: [salary],
    date: "2026/05/17",
  },
  {
    id: "9",
    description: "Restaurant dinner",
    amount: 38.9,
    account: INITIAL_ACCOUNTS[0],
    categories: [food],
    date: "2026/05/16",
  },
  {
    id: "10",
    description: "Internet subscription",
    amount: 29.99,
    account: INITIAL_ACCOUNTS[0],
    categories: [home],
    date: "2026/05/15",
  },
  {
    id: "11",
    description: "Taxi ride",
    amount: 14.8,
    account: INITIAL_ACCOUNTS[1],
    categories: [transport],
    date: "2026/05/15",
  },
  {
    id: "12",
    description: "Furniture purchase",
    amount: 129.99,
    account: INITIAL_ACCOUNTS[2],
    categories: [home],
    date: "2026/05/14",
  },
  {
    id: "13",
    description: "Supermarket",
    amount: 92.45,
    account: INITIAL_ACCOUNTS[0],
    categories: [food, home],
    date: "2026/05/13",
  },
  {
    id: "14",
    description: "Train to Girona",
    amount: 18.2,
    account: INITIAL_ACCOUNTS[1],
    categories: [transport],
    date: "2026/05/12",
  },
  {
    id: "15",
    description: "Bonus payment",
    amount: 350,
    account: INITIAL_ACCOUNTS[0],
    categories: [salary],
    date: "2026/05/10",
  },
]