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

    // var id = req.params.id

    var sqlQuery = "select * from customers"
    sql.query(connString, sqlQuery, (err, rows) => {
        if (err) {
            console.log('fel', err)
        }
        res.json(rows)
    })
})
app.get("/Products", function (req, res) {

    // var id = req.params.id

    var sqlQuery = "select * from products"
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
    console.log(body);
    myRes = res
    var customerid = req.body.customerid
    var shipaddress = req.body.ShipAddress
    var shipcity = req.body.shipcity
    var shippostalcode = req.body.ShipPostalCode
    var orderdate = req.body.OrderDate
    var requireddate = req.body.RequiredDate
    var shipvia = req.body.ShipVia
    // console.log(customerid,shipaddress,shipcity,shippostalcode,orderdate,requireddate,shipvia)

    insertOrder(customerid,shipaddress,shipcity,shippostalcode,orderdate,requireddate,shipvia)

})

function insertOrder(customerid,shipaddress,shipcity,shippostalcode,orderdate,requireddate,shipvia)
{  
    var myQuery = `insert into orders(customerid,shipaddress,shipcity,shippostalcode,orderdate,requireddate,shipvia)values
    
    ('${customerid}','${shipaddress}','${shipcity}','${shippostalcode}','${orderdate}','${requireddate}','${shipvia}')`
    
    sql.query(connString, myQuery, (err, rows) => {
        if(err) console.log(err)
        myQuery = `select max(orderid) from orders`
        sql.query(connString, myQuery, (err, rows) => {
            if(err) console.log(err)
            console.log(rows)
            var orderid2 = rows[0].Column0
            myRes.json(orderid2)
        })
    })

}
app.post('/neworderdetail', function (req, res) {
    var body = req.body
    var Orderid = req.body.Orderid
    var ProductID = req.body.ProductID
    var Quantity = req.body.Quantity
    var UnitePrice = req.body.UnitePrice
    insertOrderDetails(Orderid,ProductID,Quantity,UnitePrice)

})
function insertOrderDetails(Orderid,ProductID,Quantity,UnitePrice)
{  
    var myQuery2 = `insert into [order details](Orderid,ProductID,Quantity,UnitePrice)values

    ('${Orderid}','${ProductID}','${Quantity}','${UnitePrice}')`
    sql.query(connString, myQuery2, (err, rows) => {
        if(err) console.log(err)

    })

}

app.listen(8000)
console.log("8000")
