import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import Sellform from '../sellform/sellform';

class Sgdprice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfSgdPrice: [],
            sellItem:{},
            showSellForm: false,
        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.closeSellForm = this.closeSellForm.bind(this);
    }

    handleClick1() {
        let listOfCurrency = [];
        for (let i = 0; i < this.props.listOfPrice.length; i++) {
            let repeated = false;
            for (let j = 0; j < listOfCurrency.length; j++) {
                if (this.props.listOfPrice[i]["buy_item"]["currency"] == listOfCurrency[j]) {
                    repeated = true;
                    break;
                }
            }
            if (!repeated) {
                listOfCurrency.push(this.props.listOfPrice[i]["buy_item"]["currency"]);
            }
        }

        let reactThis = this;
        let templistOfSgdPrice = [];
        for (let i = 0; i < listOfCurrency.length; i++) {
            setTimeout(function() {
                let url = "/queryExchangeRate?search=" + listOfCurrency[i];
                let reqListener = function () {
                    let data = JSON.parse(this.responseText)["Realtime Currency Exchange Rate"];
                    for (let j = 0; j < reactThis.props.listOfPrice.length; j++) {
                        if (listOfCurrency[i] == reactThis.props.listOfPrice[j]["buy_item"]["currency"]) {
                            let obj = {
                                buy_item: reactThis.props.listOfPrice[j]["buy_item"],
                                dividend: reactThis.props.listOfPrice[j]["dividend"],
                                price: reactThis.props.listOfPrice[j]["price"],
                                exchange_rate: parseFloat(data["5. Exchange Rate"]),
                            }
                            templistOfSgdPrice.push(Object.assign({}, obj));
                            reactThis.setState({listOfSgdPrice: templistOfSgdPrice});
                        }
                    }
                }
                let oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", url);
                oReq.send();
            }, i * 15000)
        }
    }

    handleClick2(item) {
        this.setState({showSellForm: true});
        this.setState({sellItem: Object.assign({},item)});
    }

    closeSellForm() {
        this.setState({showSellForm: false});
    }

    render() {

        let itemsElements = this.state.listOfSgdPrice.map( (item, index) => {
            return (
                <tr key={index}>
                    <td className={styles.td}>
                        {item["buy_item"]["company_symbol"]}
                    </td>
                    <td className={styles.td}>
                        {item["buy_item"]["purchase_date"].substring(0, 10)}
                    </td>
                    <td className={styles.td}>
                        {item["buy_item"]["quantity"]}
                    </td>
                    <td className={styles.td}>
                        {item["buy_item"]["currency"] + " " +item["buy_item"]["price"]}
                    </td>
                    <td className={styles.td}>
                        {"SGD " +item["buy_item"]["price_sgd"]}
                    </td>
                    <td className={styles.td}>
                        {item["buy_item"]["currency"] + " " +item["price"]}
                    </td>
                    <td className={styles.td}>
                        {"SGD " + " " + (item["price"] * item["exchange_rate"]).toFixed(2)}
                    </td>
                    <td className={styles.td}>
                        {item["buy_item"]["currency"] + " " +item["dividend"]}
                    </td>
                    <td className={styles.td}>
                        {"SGD " + " " +(item["dividend"] * item["exchange_rate"]).toFixed(2)}
                    </td>
                    <td className={styles.td}>
                        { "(" + item["buy_item"]["currency"] + ")\n" + ((((item["price"]+item["dividend"]-item["buy_item"]["price"]) / item["buy_item"]["price"] * 100)).toFixed(2)) }
                    </td>
                    <td className={styles.td}>
                        { "(SGD)\n" + (((item["price"]+item["dividend"]) * item["exchange_rate"] -item["buy_item"]["price_sgd"]) / item["buy_item"]["price_sgd"] *100).toFixed(2) }
                    </td>
                    <td>
                        <button className={styles.sellbutton} onClick={()=>this.handleClick2(item)}> Sell </button>
                    </td>
                </tr>
            );
        })

        return (
                <div className={styles.div}>
                    <div>
                        <button onClick={this.handleClick1}>
                            Calculate Price in SGD
                        </button>
                    </div>
                    {this.state.listOfSgdPrice.length == this.props.listOfPrice.length && <table className={styles.table}>
                        <tbody>
                            <tr>
                                <th className={styles.th} >Symbol</th>
                                <th className={styles.th} >Date Of Purchase</th>
                                <th className={styles.th}>No of stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                                <th className={styles.th}>Current Price Per Stock</th>
                                <th className={styles.th}>Current Price Per Stock</th>
                                <th className={styles.th}>Dividend Per Stock</th>
                                <th className={styles.th}>Dividend Per Stock</th>
                                <th className={styles.th}> Gain (%)</th>
                                <th className={styles.th}> Gain (%)</th>
                            </tr>
                            {itemsElements}
                        </tbody>
                    </table>}
                    {this.state.showSellForm && <Sellform sellItem={this.state.sellItem} closeSellForm={this.closeSellForm} user_id={this.props.user_id}/>}
                </div>
        );
    }
}

export default Sgdprice;

Sgdprice.propTypes = {
  name: PropTypes.string,
  listOfPrice: PropTypes.array,
  user_id: PropTypes.number,
};