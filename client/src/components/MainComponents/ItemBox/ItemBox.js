import "./ItemBox.scss";
import { Component } from 'react';
import axios from 'axios';

class ItemBox extends Component {

    state = {
        category: "",
        section: [],
        items: [],
    }
    
    getInventoryItems() {
        axios
        .get(`${process.env.REACT_APP_API_URL}/inventory`)
        .then((response) => {
            this.setState({
                category: response.data[0].category,
                section: response.data[0].sections,
                items: response.data[0].sections[0].menu_items
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getInventoryItems();
    }

    categoryChoice = (e) => {
        e.preventDefault();
        const {inventoryData} = this.props;
        let chosenCategory = e.target.innerText;
        let newCategory = inventoryData.filter( item => item.category === chosenCategory )[0];
        this.setState ({
            category: newCategory.category,
            section: newCategory.sections,
            items: newCategory.sections[0].menu_items
        })
    }

    itemChoice = (e) => {
        e.preventDefault();
        const {inventoryData} = this.props;
        let chosenSection = e.target.innerText;
        let newCategory = inventoryData.filter( item => item.category === this.state.category)[0];
        let newSection = newCategory.sections.filter( element => element.section_name === chosenSection)[0];
        this.setState ({
            items: newSection.menu_items
        })
    }

    render() {
        const {inventoryData, onClick} = this.props;
        return(
            <section className="item-list">
                <div className="item-list__category-bar">
                        { inventoryData.map(menu => {
                            return <h4 key={Math.random()} onClick={this.categoryChoice} className="item-list__single-category"> {menu.category} </h4>
                            }
                        )}
                </div>
                <div className="item-list__section-bar">
                    {
                        this.state.section.map(section => {
                            return <h5 key={Math.random()} onClick={this.itemChoice} className="item-list__single-section"> {section.section_name} </h5>
                        })
                    }
                </div>
                <div className="item-list__item-box">
                    {
                        this.state.items.map(item => {
                            return <h5 key={Math.random()} className="item-list__single-item" onClick={() => {onClick(item.name)}}> {item.name} </h5>
                        })
                    }
                </div>
        </section>
        )
    }
}


export default ItemBox