export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.todayCases > b.todayCases ? -1 : 1));
};
