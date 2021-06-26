import "./LogBox.scss";
import {Helmet} from "react-helmet";


function LogBox(props) {
    const {orders} = props;
    return(
        <section className="logBox">
            <Helmet>
                <title>Simple POS - Main</title>
            </Helmet>
            <div className="logBox__header">
                <h3 className="logBox__header-id">Item ID</h3>
                <h3 className="logBox__header-name">Name</h3>
                <h3 className="logBox__header-quantity">Quantity</h3>
                <h3 className="logBox__header-price">Price</h3>
            </div>
            <div className="logBox__order-box">
                { orders.map((order) => {
                    return (    
                        <div key={order.id} className="logBox__single-item">
                            <h3 className="logBox__id">#{order.id}</h3>
                            <h3 className="logBox__name">{order.name}</h3>
                            <input type="number" onChange={props.onChange} id={order.name} className="logBox__input" />
                            <h3 className="logBox__price">{order.price}</h3>
                        </div>
                    )
                })
                }
            </div>
        </section>
    )
}

export default LogBox