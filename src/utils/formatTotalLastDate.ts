export const formatTotalLastDate = (date: string) => {
  const dateWithoutDay = date.split('').reverse().slice(0, 5).reverse().join('');

  return `01/${dateWithoutDay} à ${date}`;
}