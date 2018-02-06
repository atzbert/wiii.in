
window.onload = () => {
  document.querySelector('#show-me-btn').addEventListener('click', () => {
    const fromPicker = document.querySelector('#fromSymPicker');
    const fromSym = fromPicker.options[fromPicker.selectedIndex].value;
    const toPicker = document.querySelector('#toSymPicker');
    const toSym = toPicker.options[toPicker.selectedIndex].value;
    fetchDataFor(fromSym, toSym).then((data) => {
      document.querySelector('#value').innerHTML = data[data.length - 1].open + ' ' + toSym;
      createChart(data);
    });
  });
};

const fetchDataFor = (fromSym, toSym) => {
  let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + fromSym +
      '&tsym=' + toSym + '&limit=200&aggregate=1&e=CCCAGG';
  return axios.get(url).then((res) => res.data.Data);
};
