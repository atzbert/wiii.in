
const createChart = (values) => {
  const chart = new Chartist.Line('#blockchain-chart', {
    series: [values],
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
          begin: (values.length * 5) + 50,
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
