import { TRANSACTION_TYPE } from "./TransactionCategory"
import { type CategoryPrefab } from "./types"

export const CATEGORY_PREFABS: CategoryPrefab[] = [
  // Income
  {
    key: "salary",
    name: { en: "Salary", es: "Salario" },
    type: TRANSACTION_TYPE.INCOME,
    color: "#2e7d32",
    description: {
      en: "Recurring income from work",
      es: "Ingreso recurrente del trabajo",
    },
  },
  {
    key: "freelance",
    name: { en: "Freelance", es: "Freelance" },
    type: TRANSACTION_TYPE.INCOME,
    color: "#00897b",
    description: {
      en: "Side gigs and contract work",
      es: "Trabajos por cuenta propia y contratos",
    },
  },
  {
    key: "gifts",
    name: { en: "Gifts", es: "Regalos" },
    type: TRANSACTION_TYPE.INCOME,
    color: "#c2185b",
    description: {
      en: "Money received as a gift",
      es: "Dinero recibido como regalo",
    },
  },
  {
    key: "investments",
    name: { en: "Investments", es: "Inversiones" },
    type: TRANSACTION_TYPE.INCOME,
    color: "#1565c0",
    description: {
      en: "Returns, interest and dividends",
      es: "Rendimientos, intereses y dividendos",
    },
  },
  {
    key: "refunds",
    name: { en: "Refunds", es: "Reembolsos" },
    type: TRANSACTION_TYPE.INCOME,
    color: "#558b2f",
    description: {
      en: "Reimbursements and returns",
      es: "Reembolsos y devoluciones",
    },
  },
  // Expense
  {
    key: "food",
    name: { en: "Food", es: "Comida" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#ef6c00",
    description: {
      en: "Groceries, restaurants and snacks",
      es: "Supermercado, restaurantes y aperitivos",
    },
  },
  {
    key: "transport",
    name: { en: "Transport", es: "Transporte" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#1e88e5",
    description: {
      en: "Trips, tickets and commuting",
      es: "Viajes, billetes y desplazamientos",
    },
  },
  {
    key: "housing",
    name: { en: "Housing", es: "Vivienda" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#6a1b9a",
    description: {
      en: "Rent, mortgage and household costs",
      es: "Alquiler, hipoteca y gastos del hogar",
    },
  },
  {
    key: "utilities",
    name: { en: "Utilities", es: "Servicios" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#00838f",
    description: {
      en: "Electricity, water, gas and internet",
      es: "Electricidad, agua, gas e internet",
    },
  },
  {
    key: "entertainment",
    name: { en: "Entertainment", es: "Entretenimiento" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#8e24aa",
    description: {
      en: "Movies, games and going out",
      es: "Cine, juegos y salidas",
    },
  },
  {
    key: "health",
    name: { en: "Health", es: "Salud" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#d81b60",
    description: {
      en: "Medical, pharmacy and wellness",
      es: "Médico, farmacia y bienestar",
    },
  },
  {
    key: "subscriptions",
    name: { en: "Subscriptions", es: "Suscripciones" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#3949ab",
    description: {
      en: "Recurring services and memberships",
      es: "Servicios recurrentes y membresías",
    },
  },
  {
    key: "shopping",
    name: { en: "Shopping", es: "Compras" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#f4511e",
    description: {
      en: "Clothes, gadgets and general shopping",
      es: "Ropa, gadgets y compras en general",
    },
  },
  {
    key: "education",
    name: { en: "Education", es: "Educación" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#5d4037",
    description: {
      en: "Courses, books and tuition",
      es: "Cursos, libros y matrícula",
    },
  },
  {
    key: "savings",
    name: { en: "Savings", es: "Ahorro" },
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#43a047",
    description: {
      en: "Money set aside for goals",
      es: "Dinero apartado para objetivos",
    },
  },
]
