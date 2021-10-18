export const getTopThreeUser = (orders) => {
  const top = getAllUserQuantity(orders).slice(0, 3);
  return top.sort((a, b) => b[1] - a[1]);
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
