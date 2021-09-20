import { Component } from 'react';
import Header from '../../components/Header/index';
import LogBox from '../../components/MainComponents/LogBox/index';
import CalculatorBox from '../../components/MainComponents/CalculatorBox/index';
import ItemBox from '../../components/MainComponents/ItemBox/index';
import './Main.scss';
import {Helmet} from "react-helmet";


class Main extends Component {
    
    state = {
        orders : []
    }

    selectItem = (name) => {
        const {inventoryData} = this.props
            for(const category of inventoryData) {
                for(const section of category.sections) {
                    for(const menuItem of section.menu_items) {
                        if(menuItem.name === name) {
                            const newItem = {id: menuItem.id.substring(0,4), name: menuItem.name, price: menuItem.price, quantity: 1}
                            
                            this.setState((prevState) => ({
                                orders: [...prevState.orders, newItem]
                            }));
                        }
                    }
                }
            }
    }

    quantityChange = (e) => {
        const {value, id} = e.target;
        const newOrders = this.state.orders.filter(order => (order.quantity > 0)).map(order => {
            if(order.name === id) {
                let copiedOrder = {...order}
                copiedOrder.quantity = value 
                return copiedOrder;
            }
            return order
        });

        this.setState ({
            orders: newOrders
        })
    }

    resetOrders = () => {
        return this.setState({
            orders: []
        })
    }

    render() {
        // const {userData} = this.props.location.state;
        const {inventoryData} = this.props
        return(
            <section className="main">
                <Helmet>
                    <title>Simple POS - Main</title>
                </Helmet>
                <Header />
                <div className="main__body">
                    <div className="main__sub-box">
                        <LogBox orders={this.state.orders} onChange={this.quantityChange}/>
                        <CalculatorBox orders={this.state.orders} onSubmit={this.resetOrders}/>
                    </div>
                    <div>
                        <ItemBox inventoryData={inventoryData} onClick={this.selectItem} />
                    </div>
                </div>
            </section>
        )
    }
}

export default Main