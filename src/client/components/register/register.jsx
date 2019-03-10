import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }

        this.changeHandler1 = this.changeHandler1.bind(this);
        this.changeHandler2 = this.changeHandler2.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
    }

    changeHandler1(event){
        this.setState({email: event.target.value});
    }

    changeHandler2(event){
        this.setState({password: event.target.value});
    }

    handleClick1() {
        let reactThis = this;
        let url = "/addUser";
        let email = this.state.email;
        let password = this.state.password;
        let reqListener = function () {
            let data = JSON.parse(this.responseText);
            if (data == false) {
                reactThis.props.setMessage("User cannnot be created. Please register with another email.");
            }
            else {
                reactThis.props.setMessage("User is created. Please login.");
                reactThis.props.closeRegister();
            }
        }

        let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("POST", url, true);
            oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oReq.send(`email=${email}&password=${password}`);
    }

    render() {
        return(
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2 className={styles.header}> Register </h2>
                </div>
                <div className={styles.div} >
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.td}> <label className={styles.label}> Email: </label> </td>
                                <td className={styles.td}> <input onChange={this.changeHandler1}/></td>
                            </tr>
                            <tr>
                                <td className={styles.td}> <label className={styles.label}> Password: </label> </td>
                                <td className={styles.td}> <input onChange={this.changeHandler2}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className={styles.button} onClick={this.handleClick1}> Submit </button>
                </div>
            </div>
        );
    }
}

export default Register;

Register.propTypes = {
    setMessage: PropTypes.func,
    closeRegister: PropTypes.func,
}