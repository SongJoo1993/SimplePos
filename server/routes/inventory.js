const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const inventoryFilePath = __dirname + "/../data/inventory.json";

function readInventoryFile() {
    const inventoryFile = fs.readFileSync(inventoryFilePath, 'utf-8')
    const inventoryData = JSON.parse(inventoryFile);
    return inventoryData;
}

router
    .route('/')
    .get((_req,res) => {
        const inventoryData = readInventoryFile();
        res.send(inventoryData);
    })

router
    .route('/add-newItem')
    .post((req,res) => {
        const inventoryData = readInventoryFile();
        const { category, section } = req.body;

        const newInventoryItem = {
            id: uuidv4(),
            name: req.body.name,
            description: req.body.description, 
            price: req.body.price, 
            availability: req.body.availability
        }

        formValidation(req.body,res);

        const newSectionObject = addNewItem(inventoryData, category, section, newInventoryItem);
        fs.writeFileSync(inventoryFilePath, JSON.stringify(newSectionObject), 'utf-8')
        res.json(newInventoryItem);
    })
    
router
    .route('/:category/:section/:deletingId')
    .delete((req,res) => {
        const inventoryData = readInventoryFile();
        const { category, section, deletingId } = req.params;
        
        const deletedInventory = removingItem(inventoryData, category, section, deletingId);
        console.log("delete worked!")
        fs.writeFileSync(inventoryFilePath, JSON.stringify(deletedInventory), 'utf-8')
        res.json(inventoryData);
    })

router
    .route('/:category/:section/:editId')
    .put((req,_res) => {
        const inventoryData = readInventoryFile();
        const { category, section, editId } = req.params;
        editValidation(inventoryData, category, section, editId, req.body);

    })


function addNewItem (inventoryData, inputCategory, inputSection, newItem) {
    console.log(inputCategory);
    const categoryObject = inventoryData.find(inventory => inventory.category === inputCategory );
    console.log(categoryObject);
    const sectionObject = categoryObject.sections.find(item => item.section_name === inputSection);
    sectionObject.menu_items.push(newItem);
    for(let i = 0; i < inventoryData.length; i++) {
        if(inventoryData[i].category === categoryObject.category) {
            inventoryData.splice(i,1,categoryObject);
        }
    }
    return inventoryData;
}

function removingItem (data, inputCategory, inputSection, deletingId) {
    console.log(deletingId);
    const categoryObject = data.find(singleCategory => singleCategory.category === inputCategory );
    const sectionObject = categoryObject.sections.find(singleSection => singleSection.section_name === inputSection);
    const itemObject = sectionObject.menu_items.find(singleItem => singleItem.id === deletingId);
    for(let i = 0; i < sectionObject.menu_items.length; i ++) {
        console.log(sectionObject.menu_items[i]);
        console.log(itemObject.id);
        if(sectionObject.menu_items[i].id === itemObject.id) {
            sectionObject.menu_items.splice(i,1);
        }
    }
    return data;
}

function formValidation(input,res) {
    let emptyMessage = '';
    let errorCollector = [];
    let passMessage = "All Info Received!";

    const { category, section, name, description, price, availability } = input;
    const newInventory = [ category, section, name, description, price, availability ];
    const keys = ["category", "section", "name", "description", "price", "availability"];

    for(let i = 0; i < keys.length; i++) {
        if(!newInventory[i]) {
            emptyMessage += `${keys[i]} needs to be provided!`;
            errorCollector.push(keys[i])
        }
    }

    emptyMessage = `${errorCollector.join(', ')} should be provided!`

    errorCollector.length >= 1 ? res.status(400).json({message: emptyMessage}) : res.json(passMessage);
}


module.exports = router;