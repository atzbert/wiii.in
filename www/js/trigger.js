
window.onload = () => {
  document.querySelector('#show-me-btn').addEventListener('click', () => {
    const fromPicker = document.querySelector('#fromSymPicker');
    const fromSym = fromPicker.options[fromPicker.selectedIndex].value;
    const toPicker = document.querySelector('#toSymPicker');
    const toSym = toPicker.options[toPicker.selectedIndex].value;
    const fromAmount = parseFloat(document.querySelector('#fromAmount').value);
    const startDate = document.querySelector('#date').value;
    showDataFor(fromAmount, fromSym, toSym, startDate)
  });
};

const showDataFor = (amount, fromSym, toSym, startDate) => {
  let nrAmount = parseFloat(amount);
  let fromSymCap = fromSym.toUpperCase();
  let toSymCap = toSym.toUpperCase();

  let daysBack = daysBetween(new Date(), new Date(startDate || "01-01-2016"));

  fetchDataFor(fromSymCap, toSymCap, daysBack).then((data) => {
    let latestValue = data[data.length - 1].open;
    let firstValue = data[0].open;
    const factor =  nrAmount / firstValue;
    document.querySelector('#value').innerHTML = Math.round((latestValue * factor) * 100) / 100 + ' ' + toSymCap;
    createChart(data.map((entry) => entry.open * factor));
  });
};

const fetchDataFor = (fromSym, toSym, daysBack) => {
  let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + fromSym +
      '&tsym=' + toSym + '&limit=' + daysBack + '&aggregate=1&e=CCCAGG';
  return axios.get(url).then((res) => res.data.Data);
};

const daysBetween = (date1, date2) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();

  const difference_ms = Math.abs(date1_ms - date2_ms);

  return Math.round(difference_ms/ONE_DAY)
};
