
window.onload = () => {
  document.querySelector('#draw-it-btn').addEventListener('click', () => {
    fetchDataFor('ETH', 'EUR').then(createChart);
  });
};

const fetchDataFor = (fromSym, toSym) => {
  let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + fromSym +
      '&tsym=' + toSym + '&limit=200&aggregate=1&e=CCCAGG';
  return axios.get(url).then((res) => res.data.Data);
};

const createChart = (data) => {
  const chart = new Chartist.Line('#blockchain-chart', {
    series: [
      data.map((entry) => entry.open),
    ],
  }, {
    low: 0,
    showLine: true,
    axisX: {
      showLabel: true,
      offset: 0,
    },
    axisY: {
      showLabel: true,
      offset: 0,
    },
  });

  let seq = 0;
  chart.on('created', function() {
    seq = 0;
  });

  chart.on('draw', function(data) {
    if (data.type === 'line') {
      data.element.animate({
        opacity: {
          begin: seq + 1000,
          dur: 500,
          from: 0,
          to: 1,
        },
      });
    } else if (data.type === 'point') {
      data.element.animate({
        opacity: {
          begin: seq++ * 5,
          dur: 25,
          from: 0,
          to: 1,
        },
      });
    }
  });
};
