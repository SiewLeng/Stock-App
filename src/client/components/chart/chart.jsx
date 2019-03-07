import React from 'react';

import styles from './style.scss';

import {Line} from 'react-chartjs-2';

import PropTypes from 'prop-types';

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'Stock Price',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }
            ]
        };

        var count = 0;
        for (let x in this.props.graph) {
            if (count == 700) {
                break;
            }
            data.labels.push(x);
            data.datasets[0].data.push(parseFloat(this.props.graph[x]["5. adjusted close"]));
            count = count + 1;
        }

        data.labels =  data.labels.reverse();
        data.datasets[0].data = data.datasets[0].data.reverse();

        return (
            <div className={styles.graph}>
                <Line data={data} />
            </div>
        )
    }
}

export default Chart;

Chart.propTypes = {
    graph: PropTypes.object,
}