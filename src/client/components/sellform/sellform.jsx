import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

class Sellform extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick1() {
        this.props.closeSellForm();
    }

     handleClick2(item) {
        let reactThis = this;
        let url = "/addSold";
        let reqListener = function () {
            let data = JSON.parse(this.responseText);
            if (data.sellCreated==true) {
                reactThis.props.closePortfolio();
            }
            else {
                reactThis.props.setMessage("Stock is not sold successfully.");
            }
        }

        let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("POST", url, true);
            oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oReq.send(`user_id=${this.props.user_id}&buy_id=${item["buy_item"]["buy_id"]}&company_id=${item["buy_item"]["company_id"]}&quantity=${item["buy_item"]["quantity"]}&purchase_date=${item["buy_item"]["purchase_date"]}&purchase_date_zone=${item["buy_item"]["purchase_date_zone"]}&buy_price_sgd=${item["buy_item"]["price_sgd"]}&buy_price=${item["buy_item"]["price"]}&sold_price_sgd=${item["price"] * item["exchange_rate"]}&sold_price=${item["price"]}&dividend_sgd=${item["dividend"] * item["exchange_rate"]}&dividend=${item["dividend"]}`);
    }

    render() {
        let item = this.props.sellItem;
        return (
            <div className={styles.form}>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Symbol: </label>
                            </td>
                            <td className={styles.td}>
                                {item["buy_item"]["company_symbol"]}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Date Of Purchase: </label>
                            </td>
                            <td className={styles.td}>
                                {item["buy_item"]["purchase_date"].substring(0, 10)}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> No of stock: </label>
                            </td>
                            <td className={styles.td}>
                                {item["buy_item"]["quantity"]}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Bought Price Per Stock: </label>
                            </td>
                            <td className={styles.td}>
                                {item["buy_item"]["currency"] + " " +item["buy_item"]["price"]}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Bought Price Per Stock: </label>
                            </td>
                            <td className={styles.td}>
                                {"SGD " +item["buy_item"]["price_sgd"]}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Current Price Per Stock: </label>
                            </td>
                            <td className={styles.td}>
                                {item["buy_item"]["currency"] + " " +item["price"]}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Current Price Per Stock: </label>
                            </td>
                            <td className={styles.td}>
                                {"SGD " + " " + (item["price"] * item["exchange_rate"]).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Dividend Per Stock: </label>
                            </td>
                            <td className={styles.td}>
                                {item["buy_item"]["currency"] + " " +item["dividend"]}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Dividend Per Stock: </label>
                            </td>
                            <td className={styles.td}>
                                {"SGD " + " " +(item["dividend"] * item["exchange_rate"]).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Gain (%): </label>
                            </td>
                            <td className={styles.td}>
                                { "(" + item["buy_item"]["currency"] + ")" + ((((item["price"]+item["dividend"]-item["buy_item"]["price"]) / item["buy_item"]["price"] * 100)).toFixed(2)) }
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td}>
                                <label className={styles.label}> Gain (%): </label>
                            </td>
                            <td className={styles.td}>
                                { "(SGD)" + (((item["buy_item"]["price_sgd"]+(item["dividend"] -item["buy_item"]["price"])* item["exchange_rate"]) / item["buy_item"]["price_sgd"] * 100).toFixed(2)) }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={()=>this.handleClick2(item)} className={styles.button}> Submit </button>
                <button onClick={this.handleClick1} className={styles.button}> Cancel Sell </button>
            </div>
        )
    }
}

export default Sellform;

Sellform.propTypes = {
  closeSellForm: PropTypes.func,
  sellItem: PropTypes.object,
  user_id: PropTypes.number,
  setMessage: PropTypes.func,
  closePortfolio: PropTypes.func,
};