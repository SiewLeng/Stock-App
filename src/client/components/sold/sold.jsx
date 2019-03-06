import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import main_styles from '../../style.scss';


class Sold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfSold:[],
        }
    }

    componentDidMount() {
        let url = "/allSold/" + this.props.user_id ;
        let reactThis = this;
        this.setState({listOfSold: []});
        let reqListener = function () {
            let data = JSON.parse(this.responseText);
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                reactThis.setState({listOfSold: [Object.assign({},data[i]), ...reactThis.state.listOfSold]});
            }
        }

        let oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url);
        oReq.send();
    }

    render() {

        let itemsElements = this.state.listOfSold.map( (item, index) => {
            return (
                <tr key={index}>
                    <td className={styles.td}>
                        {item["symbol"]}
                    </td>
                    <td className={styles.td}>
                        {item["purchase_date"].substring(0, 10)}
                    </td>
                    <td className={styles.td}>
                        {item["sold_date"].substring(0, 10)}
                    </td>
                    <td className={styles.td}>
                        {item["quantity"]}
                    </td>
                    <td className={styles.td}>
                        {item["currency"] + " " +item["buy_price"]}
                    </td>
                    <td className={styles.td}>
                        {"SGD " +item["buy_price_sgd"]}
                    </td>
                    <td className={styles.td}>
                        {item["currency"] + " " +item["sold_price"]}
                    </td>
                    <td className={styles.td}>
                        {"SGD " + " " + (item["sold_price_sgd"]).toFixed(2)}
                    </td>
                    <td className={styles.td}>
                        {item["currency"] + " " +item["dividend"]}
                    </td>
                    <td className={styles.td}>
                        {"SGD " + " " +(item["dividend_sgd"]).toFixed(2)}
                    </td>
                    <td className={styles.td}>
                        { "(" + item["currency"] + ")\n" +
                        ( (item["sold_price"]+item["dividend"]-item["buy_price"]) / item["buy_price"] * 100 ).toFixed(2) }
                    </td>
                    <td className={styles.td}>
                        { "(SGD)\n" +
                        ( (item["sold_price_sgd"]+item["dividend_sgd"]-item["buy_price_sgd"]) / item["buy_price_sgd"] * 100 ).toFixed(2) }
                    </td>
                </tr>
            );
        })

        return (
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2 className={styles.header}> Stock Sold </h2>
                </div>
                <div className={styles.div}>
                    <table>
                        <tbody>
                            <tr>
                                <th className={styles.th} >Symbol</th>
                                <th className={styles.th} >Date Of Purchase</th>
                                <th className={styles.th} >Date Sold</th>
                                <th className={styles.th}>No of stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                                <th className={styles.th}>Sold Price Per Stock</th>
                                <th className={styles.th}>Sold Price Per Stock</th>
                                <th className={styles.th}>Dividend Per Stock</th>
                                <th className={styles.th}>Dividend Per Stock</th>
                                <th className={styles.th}> Gain (%)</th>
                                <th className={styles.th}> Gain (%)</th>
                            </tr>
                            {itemsElements}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Sold;