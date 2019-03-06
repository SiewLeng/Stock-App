import React from 'react';

import styles from './style.scss';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2 className={styles.header}> Register </h2>
                </div>
                <form className={styles.div} action="/addUser" method="POST">
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.td}> <label className={styles.label}> Email: </label> </td>
                                <td className={styles.td}> <input name="email"/></td>
                            </tr>
                            <tr>
                                <td className={styles.td}> <label className={styles.label}> Password: </label> </td>
                                <td className={styles.td}> <input name="password"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <input className={styles.button} type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Register;