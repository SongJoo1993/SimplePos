import "./CalculatorBox.scss";
import { Component } from 'react';

class CalculatorBox extends Component {
    
    state = {
        sum: 0,
        tax: 0,
        qty: 0
    }

    subTotal = (order) => {
        let sumAmount = 0;
        let price = 0;
        let quantity = 0;

        order.forEach(order => {
            price = parseFloat(order.price).toFixed(2)*1;
            quantity = parseInt(order.quantity);
            sumAmount += (price * quantity);
        })
        sumAmount.toFixed(2);

        this.setState ({
            sum: sumAmount
        })        
    }

    tax = sum => {
        this.setState({
            tax: (sum * 0.13).toFixed(2)
        })
    }

    quantity = order => {
        let qty = 0;
        order.forEach(order => {
            qty += parseInt(order.quantity)
        })
        
        this.setState({
            qty: qty
        })
    }

    sendingOrder = () => {
        alert('Order Complete!');
        this.props.onSubmit();
        return this.setState({
            sum: 0,
            tax: 0,
            qty: 0
        })
    }

    componentDidUpdate(prevProps) {
        if( prevProps.orders !== this.props.orders) {
            this.subTotal(this.props.orders);
            this.tax(this.state.sum);
            this.quantity(this.props.orders);
        }
    }
    
    render() {
        return(
            <section className="calculatorBox">
                <div className="calculatorBox__sub-total">
                    <h2 className="calculatorBox__sub-total-text">Sub Total</h2>
                    <h2 className="calculatorBox__sub-total-content">${this.state.sum.toFixed(2)}</h2>
                </div>
                <div className="calculatorBox__tax">
                    <h2 className="calculatorBox__tax-text">Tax</h2>
                    <h2 className="calculatorBox__tax-content">${this.state.tax}</h2>
                </div>
                <div className="calculatorBox__quantity">
                    <h2 className="calculatorBox__quantity-text">QTY</h2>
                    <h2 className="calculatorBox__quantity-content">{this.state.qty}</h2>
                </div> 
                <button className="calculatorBox__purchase-button" onClick={this.sendingOrder}>
                    Purchase
                </button>
        </section>
        )
    }
}

export default CalculatorBox