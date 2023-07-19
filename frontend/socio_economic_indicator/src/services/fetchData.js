export async function fetchData({
  selectedCountry,
  selectedIndicator,
  startMonth,
  endMonth,
}) {
  const [sYear, sMonth] = startMonth.split("-");
  const startDate = `${sYear}M${sMonth}`;
  const [eYear, eMonth] = endMonth.split("-");
  const endDate = `${eYear}M${eMonth}`;
  console.log(startDate, endDate);

  const url = `https://api.worldbank.org/v2/country/${selectedCountry}/indicator/${selectedIndicator}?date=${startDate}:${endDate}&per_page=1000&format=json`;

  console.log(url);

  const response = await fetch(
    url
  );

  const data = await response.json();

  let chartData = [];

  try {
    chartData = await data[1].map((item) => {
      return {
        date: item.date,
        value: item.value,
      };
    });
  } catch (error) {
    chartData = [];
  }

  console.log(chartData);

  return chartData;
}
