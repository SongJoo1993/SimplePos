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
        // console.log(inventoryData);
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

        if(!req.body.category) {
            res.status(400).json({message: "Request must include inventory category"})
        }
        if(!req.body.section) {
            res.status(400).json({message: "Request must include inventory section"})
        }
        if(!newInventoryItem.name) {
            res.status(400).json({message: "Request must include inventory name"})
        }
        if(!newInventoryItem.description) {
            res.status(400).json({message: "Request must include inventory description"})
        }
        if(!newInventoryItem.price) {
            res.status(400).json({message: "Request must include inventory price"})
        }
        if(!newInventoryItem.availability) {
            res.status(400).json({message: "Request must include inventory availability"})
        }

        const newSectionObject = addNewItem(inventoryData, category, section, newInventoryItem);

        fs.writeFileSync(inventoryFilePath, JSON.stringify(newSectionObject), 'utf-8')
        res.json(newInventoryItem);
    })
    
router
    .route('/:itemId')
    .delete((req,res) => {
        const inventoryData = readInventoryFile();
        const { category, section } = req.body;
        // removeItem()

        const selectedId = req.params.itemId;
        // console.log(selectedId);
        // console.log(typeof selectedId);

        function removingItem (data,item) {
            
            data.forEach(element => {
                let sectionItem = element.sections.map( x => {
                    console.log(x);
                });
                console.log(sectionItem);
            })
            
            // inventoryData.forEach(section => {
            //     section.sections.forEach(item => {
            //         item.menu_items.forEach(singleItem => {
            //             // singleItem.id === element ? singleItem : false;
            //             // if(singleItem.id == element) {
            //             //     return singleItem
            //             // }
            //             //     return false;
            //             console.log(singleItem.id);
            //         });
            //     });
            // });
        }

        removingItem(inventoryData, selectedId);
    })

function addNewItem (inventoryData, inputCategory, inputSection, newItem) {
    const categoryObject = inventoryData.find(inventory => inventory.category === inputCategory );
    const sectionObject = categoryObject.sections.find(item => item.section_name === inputSection);
    sectionObject.menu_items.push(newItem);

    for(let i = 0; i < inventoryData.length; i++) {
        if(inventoryData[i].category === categoryObject.category) {
            inventoryData.splice(i,1,categoryObject);
        }
    }

function removeItem (inventoryData, inputCategory, inputSection) {
    const categoryObject = inventoryData.find(inventory => inventory.category === inputCategory );
    const sectionObject = categoryObject.sections.find(item => item.section_name === inputSection);

}

    return inventoryData;
}

module.exports = router;