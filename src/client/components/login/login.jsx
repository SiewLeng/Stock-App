import React from 'react';

import styles from './style.scss';

class Login extends React.Component {
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
        let url = "/checkUser?search=" + this.state.email;
        let reactThis = this;

        let reqListener = function () {
            let data = JSON.parse(this.responseText);
            if (data.length > 0) {
                let user_id = data[0]["user_id"];
                let password = data[0]["password"];
                if (password == reactThis.state.password)  {
                    reactThis.props.setMessage("Login successfully");
                    reactThis.props.setUserId(user_id);
                    reactThis.props.closeLogin();
                }
                else {
                    reactThis.props.setMessage("Invalid password");
                }
            }
            else {
                reactThis.props.setMessage("Invalid email");
            }
        }

        let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", url);
            oReq.send();
    }

    render() {
        return(
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2 className={styles.header}> Login </h2>
                </div>
                <div className={styles.div}>
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

export default Login;