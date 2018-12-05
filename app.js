//webserver
const express = require('express')  // require Är samma sak som using i c#
const app = express()

//Parsa skickade data från client body('post')
const bodyParser = require('body-parser')
const path = require('path')

//hantera inkommande data som json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Hitta index.html och andra public files
app.use(express.static(path.join(__dirname, '')));

//Ladda in modul för sql serveråtkomst
const sql = require('msnodesqlv8');

//Connection sträng som vanligt
const connString = "server=.;Database=northwind;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.get("/Customers", function (req, res) {

    var id = req.params.id

    var sqlQuery = "Select * from Customers"
    sql.query(connString, sqlQuery, (err, rows) => {
        if (err) {
            console.log('fel', err)
        }
        res.json(rows)
    })
})
app.get("/Products", function (req, res) {

    var id = req.params.id

    var sqlQuery = "Select * from Products"
    sql.query(connString, sqlQuery, (err, rows) => {
        if (err) {
            console.log('fel', err)
        }
        res.json(rows)
    })
})
app.get("/questions/:id", function (req, res) {
    var id = req.params.id
    console.log(id)
   
    var sqlQuery = "Select * from customers where customerid='"+id+"'"
    sql.query(connString, sqlQuery, (err, rows) => {
        if (err) {
            console.log('fel', err)
        }
        console.log('antal rader', rows)
        res.json(rows)
    })
})
app.get("/products/:id", function (req, res) {
    var id = req.params.id
    console.log(id)
   
    var sqlQuery = "Select * from products where productname='"+id+"'"
    sql.query(connString, sqlQuery, (err, rows) => {
        if (err) {
            console.log('fel', err)
        }
        console.log('antal rader', rows)
        res.json(rows)
    })
})

app.post('/newCustomer', function (req, res) {
    var body = req.body
    console.log(body)
    var customerid = req.body.customerid
    var companyname = req.body.companyname
    var contactname = req.body.contactname
    var contacttitle = req.body.contacttitle
    var address = req.body.address
    var region = req.body.region
    var city = req.body.city
    var postalcode = req.body.postalcode
    var country = req.body.country
    var phone = req.body.phone
    var fax = req.body.fax
    insertCustomer(customerid,companyname,contactname,contacttitle,address,region,city,postalcode,country,phone,fax)
    
})
function insertCustomer(customerid,companyname,contactname,contacttitle,address,region,city,postalcode,country,phone,fax)
{
    var myQuery = `insert into customers(customerid,companyname,contactname,contacttitle,address,region,city,postalcode,country,phone,fax)values

    ('${customerid}','${companyname}','${contactname}','${contacttitle}','${address}','${region}','${city}','${postalcode}','${country}','${phone}','${fax}')`
    sql.query(connString, myQuery, (err, rows) => {
        if(err) console.log(err)
    })
}
app.post('/neworder', function (req, res) {
    var body = req.body
    var customerid = req.body.customerid
    var ShipAddress = req.body.ShipAddress
    var shipcity = req.body.shipcity
    var ShipPostalCode = req.body.ShipPostalCode
    var OrderDate = req.body.OrderDate
    var RequiredDate = req.body.RequiredDate
    var ShipperID = req.body.ShipperID
    var Orderid = req.body.Orderid
    var ProductID = req.body.ProductID
    var Quantity = req.body.Quantity
    insertorder(customerid,ShipAddress,shipcity,ShipPostalCode,OrderDate,RequiredDate,ShipperID,Orderid,ProductID,Quantity)

})
function insertorder(customerid,ShipAddress,shipcity,ShipPostalCode,OrderDate,RequiredDate,ShipperID,Orderid,ProductID,Quantity)
{  
    var myQuery2 = `insert into orders(customerid,ShipAddress,shipcity,ShipPostalCode,OrderDate,RequiredDate,ShipVia,Orderid))values; insert into Order Details(ProductID,Quantity)values

    ('${customerid}','${ShipAddress}','${shipcity}','${ShipPostalCode}','${OrderDate}','${RequiredDate}','${ShipperID}','${Orderid}','${ProductID}','${Quantity}')`
    sql.query(connString, myQuery2, (err, rows) => {
        if(err) console.log(err)

    })

}

app.listen(8000)
console.log("8000")
