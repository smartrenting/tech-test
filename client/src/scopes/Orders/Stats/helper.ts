export const getTopThreeUser = (orders) => {
  return getAllUserQuantity(orders)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
};

export const getAllUserQuantity = (orders): Array<[string, number]> => {
  return Object.entries(
    orders.reduce((acc, current) => {
      if (!acc[current.username]) acc[current.username] = 0;
      acc[current.username] += current.quantity;
      return acc;
    }, {})
  );
};

export const getAveragePizzaByOrder = (orders) => {
  if (orders.length <= 0) return 0;
  const quantities = orders.map((order) => order.quantity);
  return Math.round(
    quantities.reduce((acc, current) => acc + current) / quantities.length
  );
};

export const getOrdersByDate = (orders, date) => {
  const ordered = orders.map((order) => order.date === new Date(date));
  return ordered;
};
