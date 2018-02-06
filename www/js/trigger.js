
window.onload = () => {
  document.querySelector('#show-me-btn').addEventListener('click', () => {
    const fromPicker = document.querySelector('#fromSymPicker');
    const fromSym = fromPicker.options[fromPicker.selectedIndex].value;
    const toPicker = document.querySelector('#toSymPicker');
    const toSym = toPicker.options[toPicker.selectedIndex].value;
    const fromAmount = parseFloat(document.querySelector('#fromAmount').value);
    showDataFor(fromAmount, fromSym, toSym)
  });
};

const showDataFor = (amount, fromSym, toSym) => {
  fetchDataFor(fromSym, toSym).then((data) => {
    let latestValue = data[data.length - 1].open;
    let firstValue = data[0].open;
    const factor =  amount / firstValue;
    document.querySelector('#value').innerHTML = (latestValue * factor) + ' ' + toSym;
    createChart(data.map((entry) => entry.open * factor));
  });
};

const fetchDataFor = (fromSym, toSym) => {
  let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + fromSym +
      '&tsym=' + toSym + '&limit=200&aggregate=1&e=CCCAGG';
  return axios.get(url).then((res) => res.data.Data);
};
