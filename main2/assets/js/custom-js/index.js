(function ($) {

  $(document).ready(function () {

    let draw = Chart.controllers.line.prototype.draw;
    Chart.controllers.line.prototype.draw = function() {
      draw.apply(this, arguments);
      let ctx = this.chart.chart.ctx;
      let _stroke = ctx.stroke;
      ctx.stroke = function() {
        ctx.save();
        // ctx.shadowColor = '#4b4b4b8e';
        // ctx.shadowBlur = 3;
        // ctx.shadowOffsetX = 40;
        // ctx.shadowOffsetY = 2;
        _stroke.apply(this, arguments);
        ctx.restore();
      }
    };
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function(ease) {
        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-0'].top,
            bottomY = this.chart.scales['y-axis-0'].bottom;

          // draw line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          // ctx.lineWidth = 1;
          // ctx.strokeStyle = '#000';
          ctx.stroke();
          ctx.restore();
        }
        Chart.controllers.line.prototype.draw.call(this, ease);
      }
    });

    var customTooltips = function(tooltip) {
      // Tooltip Element
      var tooltipEl = document.getElementById('chartjs-tooltip');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        this._chart.canvas.parentNode.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltip.body) {
        var bodyLines = tooltip.body.map(getBody);

        var innerHtml = '<tbody>';

        bodyLines.forEach(function(body, i) {
          var span = '<span class="chartjs-tooltip-key"></span>';
          innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }

      var positionY = this._chart.canvas.offsetTop;
      var positionX = this._chart.canvas.offsetLeft;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY - (tooltip.height * 1.8) + 'px';
    };

    const myChart = () => {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'LineWithLine',

        // The data for our dataset
        data: {
          labels: ['3/15', '3/16', '3/17', '3/18', '3/19', '3/20'],
          datasets: [{
            label: 'TOTAL',
            backgroundColor: 'transparent',
            borderColor: '#2e3440',
            borderWidth: '4',
            data: [20, 30, 10, 30, 15, 35],
            pointRadius: 8,
            pointHoverRadius: 8,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#BF616A',
            pointHoverBorderWidth: '5'
          }],
        },

        // Configuration options go here
        options: {
          maintainAspectRatio: false,
          tooltips: {
            enabled: false,
            yAlign: 'top',
            custom: customTooltips,
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += '</br> ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label;
              }
            }
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                display: false,
                beginAtZero: true,
                max: 40,
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
            }]
          }
        }
      });
    }

    if ( $('#myChart').length ) {
      myChart();
    }


    $('.hamburger_icon .icon').click(function(){
      $(this).toggleClass('icon_opnd');
      $('.header--menu').slideToggle(400);
    });

  });
}(jQuery));



