
window.onload = () => {
  document.querySelector('#draw-it-btn').addEventListener('click', () => {
    fetchDataFor('EUR', 'ETH').then(createChart);
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
      showLabel: false,
      offset: 0,
    },
    axisY: {
      showLabel: false,
      offset: 0,
    },
  });

  // Let's put a sequence number aside so we can use it in the event callbacks
  let seq = 0;

  // Once the chart is fully created we reset the sequence
  chart.on('created', function() {
    seq = 0;
  });

  // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
  chart.on('draw', function(data) {
    if (data.type === 'line') {
      // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
      data.element.animate({
        opacity: {
          // The delay when we like to start the animation
          begin: seq + 1000,
          // Duration of the animation
          dur: 500,
          // The value where the animation should start
          from: 0,
          // The value where it should end
          to: 1,
        },
      });
    } else if (data.type === 'point') {
      // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
      data.element.animate({
        opacity: {
          // The delay when we like to start the animation
          begin: seq++ * 5,
          // Duration of the animation
          dur: 25,
          // The value where the animation should start
          from: 0,
          // The value where it should end
          to: 1,
        },
      });
    }
  });
};
