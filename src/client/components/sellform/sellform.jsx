import React from 'react';

import styles from './style.scss';

class Sellform extends React.Component {
    constructor(props) {
        super(props);
        this.handelClick1 = this.handelClick1.bind(this);
    }

    handelClick1() {
        this.props.closeSellForm();
    }

    render() {
        let item = this.props.sellItem;
        let url = "/addSold";
        return (
            <div>
            <form className={styles.form} action = {url} method="POST">
                <table>
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
                </table>
                <input type="hidden" name="user_id" value={this.props.user_id}/>
                <input type="hidden" name="buy_id" value={item["buy_item"]["buy_id"]}/>
                <input type="hidden" name="company_id" value={item["buy_item"]["company_id"]}/>
                <input type="hidden" name="quantity" value={item["buy_item"]["quantity"]}/>
                <input type="hidden" name="purchase_date" value={item["buy_item"]["purchase_date"]}/>
                <input type="hidden" name="purchase_date_zone" value={item["buy_item"]["purchase_date_zone"]}/>
                <input type="hidden" name="buy_price_sgd" value={item["buy_item"]["price_sgd"]}/>
                <input type="hidden" name="buy_price" value={item["buy_item"]["price"]}/>
                <input type="hidden" name="sold_price_sgd" value={item["price"] * item["exchange_rate"]}/>
                <input type="hidden" name="sold_price" value={item["price"]}/>
                <input type="hidden" name="dividend_sgd" value={item["dividend"] * item["exchange_rate"]}/>
                <input type="hidden" name="dividend" value={item["dividend"]}/>
                <input className={styles.button} type="submit" value="Submit" />
                <button onClick={this.handelClick1} className={styles.button} > Cancel Sell </button>
            </form>
            </div>
        )
    }
}

export default Sellform;