import { Component } from 'react';
import "./AddBox.scss";
import axios from 'axios';

class AddBox extends Component {

    state = {
        category : "",
        section : "",
        name : "",
        availability : "",
        price : "",
        description : "",
    }

    isFormValid = () => {
        if (
            this.state.category.trim() === "" ||
            this.state.section.trim() === "" ||
            this.state.name.trim() === "" ||
            this.state.availability.trim() === "" ||
            this.state.price.trim() === "" ||
            this.state.description.trim() === ""
        ) { 
            return false;
        } else if(isNaN(this.state.price)) {
            return false;
        } 
        // else if(this.state.availability !== "true" || this.state.availability !== "false"   ) {
        //     return false;
        // }
        return true;
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        
        const newItem = {
            category: this.state.category,
            section: this.state.section,
            name: this.state.name,
            description: this.state.description, 
            price: this.state.price, 
            availability: this.state.availability
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/inventory/add-newItem`, newItem)
            .then(res => {
                this.props.getInventoryItems();
                this.props.history.goBack();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        console.log(this.props);
        return(
            <section className="add-item">
                {/* <Header /> */}
                <form className="add-item__form" onSubmit={this.handleFormSubmit}>
                    <div className="add-item__form-box">
                        <h2 className="add-item__form-header">Adding New Item</h2>
                        {/* Category */}
                        <div className="add-item__row">
                            <div className="add-item__row-first-box">
                                <label className="add-item__label" htmlFor="category">Category</label>
                                <input 
                                    type="text"
                                    id="category"
                                    name="category"
                                    className="add-item__input"
                                    placeholder="Category"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Section */}
                        <div className="add-item__row">
                            <div className="add-item__row-first-box">
                                <label className="add-item__label" htmlFor="section">Section</label>
                                <input 
                                    type="text"
                                    id="section"
                                    name="section"
                                    className="add-item__input"
                                    placeholder="Section"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Name */}
                        <div className="add-item__row">
                            <div className="add-item__row-first-box">
                                <label className="add-item__label" htmlFor="name">Name</label>
                                <input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="add-item__input"
                                    placeholder="Name"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Availability */}
                        <div className="add-item__row">
                            <div className="add-item__row-first-box">
                                <label className="add-item__label" htmlFor="availability">Availability</label>
                                <input 
                                    type="text"
                                    id="availability"
                                    name="availability"
                                    className="add-item__input"
                                    placeholder=" "
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Price */}
                        <div className="add-item__row">
                            <div className="add-item__row-first-box">
                                <label className="add-item__label" htmlFor="price">Price</label>
                                <input 
                                    type="text"
                                    id="price"
                                    name="price"
                                    className="add-item__input"
                                    placeholder="Price"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Description */}
                        <div className="add-item__row">
                            <div className="add-item__row-first-box">
                                <label className="add-item__label" htmlFor="description">Description</label>
                                <input 
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="add-item__input"
                                    placeholder="Description"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                </div>
                {/* Button */}
                <div className="add-item__button-box">
                    <button type="submit" className="add-item__button" disabled={!this.isFormValid()}>+Add Item</button>
                </div>
            </form>
        </section>
        )
    }
}


export default AddBox