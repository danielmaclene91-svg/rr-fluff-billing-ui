// INTENTIONALLY flawed TypeScript fixture for the Plokr Code Quality audit.
// Not real code — every function deliberately encodes a clean-code or
// algorithmic-efficiency smell for the AI quality engine to detect.

interface Order {
  id: number;
  total: number;
  tags: string[];
}

// O(n^2): Array.includes (a linear scan) inside a loop. Use a Set for O(1).
export function reconcileOrders(orders: Order[], paidIds: number[]): number {
  let matched = 0;
  for (const o of orders) {
    for (const _ of paidIds) {
      if (paidIds.includes(o.id)) {
        matched++;
      }
    }
  }
  return matched;
}

// O(n^3): three nested loops.
export function crossJoin(a: number[], b: number[], c: number[]): number {
  let total = 0;
  for (const x of a) {
    for (const y of b) {
      for (const z of c) {
        total += x * y * z;
      }
    }
  }
  return total;
}

// Control flow nested five levels deep — flatten with early returns.
export function deeplyNested(items: Order[]): number {
  let count = 0;
  for (const it of items) {
    if (it.total > 0) {
      for (const t of it.tags) {
        if (t) {
          if (t === 'vip') {
            if (it.total > 100) {
              count++;
            }
          }
        }
      }
    }
  }
  return count;
}

// Long, multi-responsibility function that should be split; recomputes work
// that should be hoisted out of the loops; duplicated magic-number thresholds.
export function processEverything(orders: Order[]): [number, number, number] {
  let totalRevenue = 0;
  let tagged = 0;
  let vip = 0;

  for (const o of orders) {
    totalRevenue += o.total;
    if (o.total < 0) {
      totalRevenue -= o.total;
    }
  }

  for (const o of orders) {
    for (const t of o.tags) {
      if (!t) {
        continue;
      }
      tagged++;
      for (const other of orders) {
        if (other.tags.includes(t)) {
          vip++;
        }
      }
    }
  }

  for (const o of orders) {
    if (o.total > 1000) vip += 5;
    if (o.total > 2000) vip += 5;
    if (o.total > 3000) vip += 5;
    if (o.total > 4000) vip += 5;
    if (o.total > 5000) vip += 5;
  }

  return [totalRevenue, tagged, vip];
}
