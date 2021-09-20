import { Component } from 'react';
import "./EditBox.scss";
import axios from 'axios';

class EditBox extends Component {
    state = {
        category: this.props.selectedItem.category,
        section: this.props.selectedItem.sections,
        name: this.props.selectedItem.name,
        availability: this.props.selectedItem.availability,
        price : this.props.selectedItem.price,
        description: this.props.selectedItem.description,
        response: false
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    priceInput = () => {
        return this.state.price.indexOf(".") === -1 ? this.setState({price : `${this.state.price}.00`}) : console.log("Decimal Provided");
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {productId} = this.props.match.params
        const editedItem = {
            category: this.state.category,
            section: this.state.section,
            name: this.state.name,
            description: this.state.description, 
            price: this.state.price, 
            availability: this.state.availability
        }
        
        axios
            .put(`${process.env.REACT_APP_API_URL}/inventory/${editedItem.category}/${editedItem.section}/${productId}`, editedItem)
            .then(_res => {
                this.props.getInventoryItems();
                this.setState({
                    response: true
                })
                this.props.history.push("/products");
                // console.log(`${this.props.history.location.pathname}`);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const {selectedItem, inventoryData} = this.props;
        console.log(this.state.response);
        return(
            <section className="edit-item">
                <form className="edit-item__form" onSubmit={this.handleFormSubmit}>
                    <div className="edit-item__form-box">
                        <h2 className="edit-item__form-header">Editing Item</h2>
                        {/* <div className="edit-item__row">
                            <div className="edit-item__row-first-box">
                                <label className="edit-item__label" htmlFor="category">Category</label>
                                <select value={this.state.category} name="category" id="category" className="edit-item__optional-input" onChange={this.handleInputChange}>
                                        {inventoryData.map(category => {
                                            return (<option value={category.category} key={Math.random()}>{category.category}</option>)
                                        })}
                                </select>
                            </div>
                        </div> */}
                        {/* <div className="edit-item__row">
                            <div className="edit-item__row-first-box">
                                <label className="edit-item__label" htmlFor="category">Section</label>
                                <input 
                                    type="text" 
                                    id="section" 
                                    name="section"
                                    className="add-item__input" 
                                    value={this.state.section}
                                    onChange={this.handleInputChange}                            />
                            </div>
                        </div> */}
                        <div className="edit-item__row">
                            <div className="edit-item__row-first-box">
                                <label className="edit-item__label" htmlFor="category">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    className="add-item__input" 
                                    value={this.state.name}
                                    onChange={this.handleInputChange}                            />
                            </div>
                        </div>
                        <div className="edit-item__row">
                            <div className="edit-item__row-first-box"> 
                                <label className="edit-item__label" htmlFor="category">Availability</label>
                                <input 
                                    type="text" 
                                    id="availability" 
                                    name="availability"
                                    className="add-item__input" 
                                    value={this.state.availability}
                                    onChange={this.handleInputChange}                            />
                            </div>
                        </div>
                        <div className="edit-item__row">
                            <div className="edit-item__row-first-box">
                                <label className="edit-item__label" htmlFor="category">Price</label>
                                <input 
                                    type="text" 
                                    id="price" 
                                    name="price"
                                    className="add-item__input" 
                                    value={this.state.price}
                                    onChange={this.handleInputChange}                            />
                            </div>
                        </div>
                        <div className="edit-item__row">
                            <div className="edit-item__row-first-box">
                                <label className="edit-item__label" htmlFor="category">Description</label>
                                <input 
                                    type="text" 
                                    id="description" 
                                    name="description" 
                                    className="add-item__input"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}                            />
                            </div>
                        </div>
                    </div>
                    <div className="edit-item__button-box">
                        <button type="submit" className="add-item__button">Edit Item</button>
                    </div>
                </form>
            </section>
        )
    }
} 

export default EditBox