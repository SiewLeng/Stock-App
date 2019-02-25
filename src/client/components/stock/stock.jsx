import React from 'react';

import styles from './style.scss';

import Chart from '../chart/chart';

import Modal from '../modal/modal';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockEndPoint: {},
            graph: {},
            show: false,
            showForm: false
        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
    }

    handleClick1() {
        let reactThis = this;

        let url1 = "/queryStockEndPoint?search=" + this.props.company["1. symbol"];
        let reqListener1 = function () {
            //transform the response to real js objects
            let data = JSON.parse(this.responseText);
            // here, we can't do this.setState
            //refer to react state instead
            reactThis.setState({stockEndPoint: Object.assign({}, data["Global Quote"])});
            reactThis.setState({show: true});
        }

        let oReq1 = new XMLHttpRequest();
        oReq1.addEventListener("load", reqListener1);
        oReq1.open("GET", url1);
        oReq1.send();

        let url2 = "/queryStockDaily?search=" + this.props.company["1. symbol"];
        let reqListener2 = function () {
            let data = JSON.parse(this.responseText);
            reactThis.setState({graph: Object.assign({}, data["Time Series (Daily)"])});
        }
        let oReq2 = new XMLHttpRequest();
        oReq2.addEventListener("load", reqListener2);
        oReq2.open("GET", url2);
        oReq2.send();
    }

    handleClick2() {
        this.setState({showForm: true});
    }

    handleClick3() {
        this.setState({showForm: false});
    }

    render() {
        return (
            <div>
                <table className={styles.table}>
                    <tr>
                        <th className={styles.th} >Symbol</th>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Type</th>
                        <th className={styles.th} >Region</th>
                        <th className={styles.th} >Market Open</th>
                        <th className={styles.th} >Market Close</th>
                        <th className={styles.th} >Timezone</th>
                        <th className={styles.th} >Currency</th>
                        <th className={styles.th} ></th>
                    </tr>
                    <tr>
                        <td className={styles.td}> {this.props.company["1. symbol"]} </td>
                        <td className={styles.td}> {this.props.company["2. name"]} </td>
                        <td className={styles.td}> {this.props.company["3. type"]} </td>
                        <td className={styles.td}> {this.props.company["4. region"]} </td>
                        <td className={styles.td}> {this.props.company["5. marketOpen"]} </td>
                        <td className={styles.td}> {this.props.company["6. marketClose"]} </td>
                        <td className={styles.td}> {this.props.company["7. timezone"]} </td>
                        <td className={styles.td}> {this.props.company["8. currency"]} </td>
                        <td> <button className={styles.button} onClick={this.handleClick1}> More Details </button> </td>
                    </tr>
                </table>
                {this.state.show && <table className={styles.table}>
                    <tr>
                        <th className={styles.th} >Open</th>
                        <th className={styles.th} >High</th>
                        <th className={styles.th} >Low</th>
                        <th className={styles.th} >Price</th>
                        <th className={styles.th} >Volume</th>
                        <th className={styles.th} >Latest Trading Day</th>
                        <th className={styles.th} >Previous Close</th>
                        <th className={styles.th} >Change</th>
                        <th className={styles.th} >Change Percent</th>
                    </tr>
                    <tr>
                        <td className={styles.td}> {this.state.stockEndPoint["02. open"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["03. high"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["04. low"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["05. price"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["06. volume"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["07. latest trading day"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["08. previous close"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["09. change"]} </td>
                        <td className={styles.td}> {this.state.stockEndPoint["10. change percent"]} </td>
                    </tr>
                </table>}
                {this.state.show && <Chart graph={this.state.graph}/>}
                {this.state.show && <button className={styles.formButton1} onClick={this.handleClick2} > Buy </button>}
                {this.state.show && <button className={styles.formButton2} onClick={this.handleClick3} > Cancel </button>}
                {this.state.showForm && <Modal company={this.props.company} stock={this.state.stockEndPoint}/>}
            </div>
        )
    }
}

export default Stock;