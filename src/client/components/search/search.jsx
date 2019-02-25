import React from 'react';

import styles from './style.scss';

import Stock from '../stock/stock';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            word: '',
            listOfCompany: [],
            company: {},
            showTable: false,
            showCompany: false
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
    }

    changeHandler(event){
        this.setState({word:event.target.value});
    }

    handleClick1() {
        this.setState({showTable: true});

        let url = "/queryCompany?search=" + this.state.word;
        let reactThis = this;
        let reqListener = function () {
            //transform the response to real js objects
            let data = JSON.parse(this.responseText).bestMatches;
            // here, we can't do this.setState
            //refer to react state instead
            reactThis.setState({listOfCompany: data});
        }
        let oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url);
        oReq.send();
    }

    handleClick2(item) {
        this.setState({company: Object.assign({}, item)});
        this.setState({showCompany: true});
    }

    handleClick3() {
        this.setState({word: '',});
        this.setState({showTable: false});
        this.setState({showCompany: false});
    }

    render() {
        let itemsElements = this.state.listOfCompany.map( (item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={styles.td}> {item["1. symbol"]} </td>
                                        <td className={styles.td}> {item["2. name"]} </td>
                                        <td className={styles.td}> {item["3. type"]} </td>
                                        <td className={styles.td}> {item["4. region"]} </td>
                                        <td className={styles.td}> {item["8. currency"]} </td>
                                        <td className={styles.td}> <button
                                                onClick={()=>{
                                                    this.handleClick2(item);
                                                }} >
                                                Submit
                                             </button>
                                        </td>
                                    </tr>
                                )
                            });

        return (
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2 className={styles.header}> Search Stock </h2>
                </div>
                <div className={styles.div}>
                    <label className={styles.label}> Company name: </label>
                    <input onChange={this.changeHandler}/>
                    <button className={styles.button} onClick={this.handleClick1}> Submit </button>
                    <button className={styles.button} onClick={this.handleClick3}> New Search </button>
                </div>
                <div className={styles.div}>
                    {this.state.showTable && <table className={styles.table}>
                        <tr>
                            <th className={styles.th} >Symbol</th>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Type</th>
                            <th className={styles.th} >Region</th>
                            <th className={styles.th} >Currency</th>
                            <th className={styles.th} ></th>
                        </tr>
                            {itemsElements}
                    </table>}
                </div>
                <div className={styles.div}>
                    {this.state.showCompany && <Stock company={this.state.company}/>}
                </div>
            </div>
        );
    }
}

export default Search;