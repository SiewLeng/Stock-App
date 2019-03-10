import React from 'react';

import styles from './style.scss';

import PropTypes from 'prop-types';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.changeHandler1 = this.changeHandler1.bind(this);
    }

    changeHandler1(event){
        this.setState({number:event.target.value});
    }

    handleClick1() {
        let reactThis = this;
        let url = "/addStock";
        let reqListener = function () {
            let data = JSON.parse(this.responseText);
            if (data.buyCreated == false) {
                reactThis.props.setMessage("Fail to buy the stock. Please try again.");
            }
            else {
                reactThis.props.setMessage("Stock is bought successfully.");
                reactThis.props.closeModal();
            }
        }
        let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("POST", url, true);
            oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oReq.send(`number=${this.state.number}&user_id=${this.props.user_id}&price=${this.props.stock["05. price"]}&symbol=${this.props.company["1. symbol"]}&name=${this.props.company["2. name"]}&type=${this.props.company["3. type"]}&region=${this.props.company["4. region"]}&market_open=${this.props.company["5. marketOpen"]}&market_close=${this.props.company["6. marketClose"]}&timezone=${this.props.company["7. timezone"]}&currency=${this.props.company["8. currency"]}`);
    }

    render() {
        let price = this.props.company["8. currency"] + " " + this.props.stock["05. price"];

        return (
            <div className={styles.form}>
                <table>
                    <tbody>
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
                            <td className={styles.td}> <input onChange={this.changeHandler1}/> </td>
                        </tr>
                    </tbody>
                </table>
                <button className={styles.button} onClick={this.handleClick1}> Submit </button>
            </div>
        )
    }
}

export default Modal;

Modal.propTypes = {
  company: PropTypes.object,
  stock: PropTypes.object,
  user_id: PropTypes.number,
  closeModal: PropTypes.func,
  setMessage: PropTypes.func,
};