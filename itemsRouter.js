const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");

function FindItem(name)
{
    return items.find((item)=>{
        return item.name === name;
    })
}

router.get("/",(req,res)=>
{
    res.json(items)
});

router.post("/",(req,res)=>
{
    const {name,price} = req.body;
    if(!name)
    {
        throw "name is required";
    }
    if(!price)
    {
        throw "price is required";
    }
    if(FindItem(name))
    {
        throw "given item already exists";
    }
    let newItem = {name,price}
    items.push(newItem); 
    res.status(201).json(newItem)
});

router.get("/:name",(req,res)=>
{
    const name = req.params.name;
    const foundItem = FindItem(name);
    if(!foundItem)
    {
        throw "given item does not exist";
    }

    res.status(200).json(foundItem);

});

router.patch("/:name",(req,res)=>
{
    const {name,price} = req.body;
    if(!name)
    {
        throw "name is required";
    }
    if(!price)
    {
        throw "price is required";
    }
    const oldName = req.params.name;
    const foundItem = FindItem(oldName)
    if(!foundItem)
    {
        throw "given item does not exist";
    }
    const newItem = {name,price}
    items = items.filter((elm)=>
    {
        return elm.name != oldName;
    })
    items.push(newItem);

    res.status(200).json(newItem);
});

router.delete("/:name",(req,res)=>
{
    const name = req.params.name;
    const foundItem = FindItem(name)
    if(!foundItem) throw "given name does not exist";
    items = items.filter((elm)=>
    {
        return elm.name != name;
    })
    res.send("deleted");
    
})
