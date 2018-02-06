let fromPicker, toPicker, amountInput, datePicker;

window.onload = () => {
  fromPicker = document.querySelector('#fromSymPicker');
  toPicker = document.querySelector('#toSymPicker');
  amountInput = document.querySelector('#fromAmount');
  datePicker = document.querySelector('#date');

  document.querySelector('#show-me-btn').addEventListener('click', () => {
    const fromSym = fromPicker.options[fromPicker.selectedIndex].value;
    const toSym = toPicker.options[toPicker.selectedIndex].value;
    const amount = parseFloat(amountInput.value);
    const startDate = datePicker.value;

    showDataFor({amount, fromSym, toSym, startDate});
  });
};

const showDataFor = (__opts) => {
  const opts = {
    amount: parseFloat(__opts.amount || 100),
    fromSym: (__opts.fromSym || 'BTC').toUpperCase(),
    toSym: (__opts.toSym || 'USD').toUpperCase(),
    startDate: new Date(__opts.startDate || '01-01-2016'),
  };

  let daysBack = daysBetween(new Date(), opts.startDate);

  updateUI(opts);

  return fetchDataFor(opts.fromSym, opts.toSym, daysBack).then((data) => {
    const firstValue = data[0].open;
    const latestValue = data[data.length - 1].open;
    const factor = opts.amount / firstValue;

    let roundedNowValue = Math.round((latestValue * factor) * 100) / 100;

    document.querySelector('#value').innerHTML = roundedNowValue + ' ' + opts.toSym;
    createChart(data.map((entry) => entry.open * factor));

    return data;
  });
};

const updateUI = (opts) => {
  fromPicker.value = opts.fromSym;
  toPicker.value = opts.toSym;
  amountInput.value = opts.amount;
  datePicker.value = opts.startDate;
};

const fetchDataFor = (fromSym, toSym, daysBack) => {
  let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + fromSym +
      '&tsym=' + toSym + '&limit=' + daysBack + '&aggregate=1&e=CCCAGG';
  return axios.get(url).then((res) => res.data.Data);
};

const daysBetween = (date1, date2) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  return Math.round(Math.abs(date1.getTime() - date2.getTime()) / ONE_DAY);
};
