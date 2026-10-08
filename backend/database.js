const Database = require("better-sqlite3");

const db = new Database("aura.db");

// Create orders table
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer TEXT NOT NULL,
    product TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL,
    courier TEXT,
    tracking_id TEXT,
    expected_delivery TEXT,
    delivered TEXT,
    ordered TEXT,
    cancellation_eligible INTEGER DEFAULT 0
  )
`);

// Insert mock orders
const insertOrder = db.prepare(`
  INSERT OR REPLACE INTO orders (
    id,
    customer,
    product,
    amount,
    status,
    courier,
    tracking_id,
    expected_delivery,
    delivered,
    ordered,
    cancellation_eligible
  )
  VALUES (
    @id,
    @customer,
    @product,
    @amount,
    @status,
    @courier,
    @tracking_id,
    @expected_delivery,
    @delivered,
    @ordered,
    @cancellation_eligible
  )
`);

const orders = [
  {
    id: "101",
    customer: "Priya Sharma",
    product: "Vitamin C Serum 30ml",
    amount: 699,
    status: "Out for Delivery",
    courier: "BlueDart",
    tracking_id: "BD-982103",
    expected_delivery: "Today by 6 PM",
    delivered: null,
    ordered: null,
    cancellation_eligible: 0
  },

  {
    id: "102",
    customer: "Rahul Verma",
    product: "Hydrating Sunscreen SPF 50",
    amount: 499,
    status: "Delivered",
    courier: "Delhivery",
    tracking_id: "DL-441029",
    expected_delivery: null,
    delivered: "14 days ago",
    ordered: null,
    cancellation_eligible: 0
  },

  {
    id: "103",
    customer: "Ananya Patel",
    product: "Green Tea Face Wash + Toner",
    amount: 850,
    status: "Processing",
    courier: null,
    tracking_id: null,
    expected_delivery: null,
    delivered: null,
    ordered: "3 hours ago",
    cancellation_eligible: 1
  }
];

for (const order of orders) {
  insertOrder.run(order);
}

console.log("SQLite database initialized successfully");

module.exports = db;
