import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart.js";
import {getChartLabels, calculateCostByPointType, calculateCountByPointType, calculateTimeByPointType} from "../utils/stats.js";

const BAR_HEIGHT = 55;

const CHART_TYPE = `horizontalBar`;
const BG_COLOR = `#ffffff`;
const HOVER_BG_COLOR = `#ffffff`;
const ANCHOR = `start`;
const FONT_SIZE = 13;

const LABELS_COLOR = `#000000`;
const LABELS_ANCHOR = `end`;
const LABELS_ALIGN = `start`;

const TITLE_COLOR = `#000000`;
const TITLE_FONT_SIZE = 23;
const TITLE_POSITION = `left`;

const Y_AXIS_TICKS_COLOR = `#000000`;
const Y_AXIS_TICKS_PADDING = 5;
const Y_AXIS_TICKS_FONT_SIZE = 13;
const Y_AXIS_BAR_THICKNESS = 44;

const X_AXIS_MIN_BAR_LENGHT = 50;

const ChartTitle = {
  TIME: `Time-Spend`,
  MONEY: `Money`,
  TYPE: `Type`
};

const renderChart = (ctx, points, title, formatter, dataFunc) => {
  const chartLabels = getChartLabels(points);
  const dataMap = dataFunc(points);
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: CHART_TYPE,
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartLabels.map((label) => dataMap.get(label)),
        backgroundColor: BG_COLOR,
        hoverBackgroundColor: HOVER_BG_COLOR,
        anchor: ANCHOR
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE
          },
          color: LABELS_COLOR,
          anchor: LABELS_ANCHOR,
          align: LABELS_ALIGN,
          formatter
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: TITLE_COLOR,
        fontSize: TITLE_FONT_SIZE,
        position: TITLE_POSITION
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Y_AXIS_TICKS_COLOR,
            padding: Y_AXIS_TICKS_PADDING,
            fontSize: Y_AXIS_TICKS_FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: Y_AXIS_BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: X_AXIS_MIN_BAR_LENGHT
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>
  `;
};

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._data = {
      points
    };

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
    const points = this._data.points;

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const barsCount = getChartLabels(points).length;
    moneyCtx.height = BAR_HEIGHT * barsCount;
    typeCtx.height = BAR_HEIGHT * barsCount;
    timeCtx.height = BAR_HEIGHT * barsCount;

    this._moneyChart = renderChart(moneyCtx, points, ChartTitle.MONEY, (val) => `€ ${val}`, calculateCostByPointType);
    this._typeChart = renderChart(typeCtx, points, ChartTitle.TYPE, (val) => `${val}x`, calculateCountByPointType);
    this._timeChart = renderChart(timeCtx, points, ChartTitle.TIME, (val) => `${val}D`, calculateTimeByPointType);
  }
}
