import "./ItemList.scss";
import { Component } from 'react';

class ItemList extends Component {

    state = {
        category: "Lunch",
        section: [{section_name: "Salad"}, {section_name: "Combo Rolls"}, {section_name: "Lunch Specials"}],
        items: [ {name: "Smoke Salmon Salad"}, {name: "Tuna Salad"}],
    }
    
    categoryChoice = (e) => {
        e.preventDefault();
        const {inventoryData} = this.props.inventoryData;
        let chosenCategory = e.target.innerText;
        let newCategory = inventoryData.filter( item => item.category === chosenCategory )[0];
        console.log(newCategory.sections);
        this.setState ({
            category: newCategory.category,
            section: newCategory.sections,
            items: newCategory.sections[0].menu_items
        })
    }

    itemChoice = (e) => {
        e.preventDefault();
        const {inventoryData} = this.props.inventoryData;
        let chosenSection = e.target.innerText;
        let newCategory = inventoryData.filter( item => item.category === this.state.category)[0];
        let newSection = newCategory.sections.filter( element => element.section_name === chosenSection)[0];
        this.setState ({
            items: newSection.menu_items
        })
    }


    render() {
        const {inventoryData} = this.props.inventoryData;
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
                        return <h5 key={Math.random()} className="item-list__single-item"> {item.name} </h5>
                    })
                }
            </div>
        </section>
        )
    }
}

export default ItemList;