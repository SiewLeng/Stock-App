import React from 'react';

import styles from './style.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let url = "/addStock/" +  this.props.company["1. symbol"] + "/" + this.props.stock["05. price"];
        let price = this.props.company["8. currency"] + " " + this.props.stock["05. price"];
        return (
            <form className={styles.form} action = {url} method="POST">
                <table>
                    <tr>
                        <td className={styles.td}> <label className={styles.label}> Symbol: </label> </td>
                        <td className={styles.td}> {this.props.company["1. symbol"]} </td>
                    </tr>
                    <tr>
                        <td className={styles.td}> <label className={styles.label}> Name: </label> </td>
                        <td className={styles.td}> {this.props.company["2. name"]} </td>
                    </tr>
                    <tr>
                        <td className={styles.td}> <label className={styles.label}> Region: </label> </td>
                        <td className={styles.td}> {this.props.company["4. region"]} </td>
                    </tr>
                    <tr>
                        <td className={styles.td}> <label className={styles.label}> Price per stock: </label> </td>
                        <td className={styles.td}> {price} </td>
                    </tr>
                    <tr>
                        <td className={styles.td}> <label className={styles.label}> No of stock: </label> </td>
                        <td className={styles.td}> <input className={styles.textinput} type="text" name="number" /> </td>
                    </tr>
                </table>
                <input type="hidden" name="symbol" value={this.props.company["1. symbol"]}/>
                <input type="hidden" name="name" value={this.props.company["2. name"]}/>
                <input type="hidden" name="type" value={this.props.company["3. type"]}/>
                <input type="hidden" name="region" value={this.props.company["4. region"]}/>
                <input type="hidden" name="market_open" value={this.props.company["5. marketOpen"]}/>
                <input type="hidden" name="market_close" value={this.props.company["6. marketClose"]}/>
                <input type="hidden" name="timezone" value={this.props.company["7. timezone"]}/>
                <input type="hidden" name="currency" value={this.props.company["8. currency"]}/>
                <input className={styles.button} type="submit" value="Submit" />
            </form>
        )
    }
}

export default Modal;