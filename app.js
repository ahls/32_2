const express = require("express");
const items = require("./fakeDb")
const itemsRoutes = require("./routes/items")

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoutes);

app.listen(3000, function () {
    console.log('App on port 3000');
  })