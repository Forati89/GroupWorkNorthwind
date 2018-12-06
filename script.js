
// $(document).ready(function() {
//   $.get("/Customers",function(response){

//     select = document.getElementById('custom');

//       for(var i = 0; i<response.length; i++){
//         select.add(new Option(response[i].CustomerID) );
//       }
//   })

//   $.get("/Products",function(response){

//     select = document.getElementById('ProductID');

//       for(var i = 0; i<response.length; i++){
//         select.add(new Option(response[i].ProductName) );
//       }
//   })
// });
function search(searchField, insertTH, insertTB, query){

    function send()
    {
     var cid=document.querySelector(searchField).value
      var url=query+cid
     console.log(url)
     
      fetch(url)
    .then(function(response) {
      return response.json(); //promise
    })
    .then(function(myJson) {
     var obj=myJson[0]
        
     for(let v in obj)
     {
       console.log(v,obj[v])
     }
     show(obj)
    });
    
    }
    function show(obj)
    {
   var array=Object.keys(obj)
    var rad="<tr>"
   array.map(x=>{
     rad+= `<th>${x}</th>`
    })
    rad+="</tr>"
    document.querySelector(insertTH).innerHTML=rad
      var array=Object.values(obj)
    var rad="<tr>"
   array.map(x=>{
     rad+= `<td>${x}</td>`
    })
    rad+="</tr>"
    document.querySelector(insertTB).innerHTML=rad
  }

  send();
}
function fillCart(){
  document.getElementById("cartProduct").innerHTML = document.querySelector("#ProductID").value;
  document.getElementById("cartPPrice").innerHTML = document.querySelector("#Quantity").value;
  document.getElementById("cartPCount").innerHTML = document.querySelector("#UnitPrice").value + ' kr';
  document.getElementById("cartPTotal").innerHTML = document.querySelector("#UnitPrice").value * document.querySelector("#Quantity").value + ' kr';
}
function clearBoxesC(){
    document.getElementById("customerid").value = '';
    document.getElementById("companyname").value = '';
    document.getElementById("contactname").value = '';
    document.getElementById("contacttitle").value = '';
    document.getElementById("address").value = '';
    document.getElementById("region").value = '';
    document.getElementById("city").value = '';
    document.getElementById("postalcode").value = '';
    document.getElementById("country").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("fax").value = '';
}
function saveCustomer()
         {
             var customerid=document.querySelector("#customerid").value
             var companyname=document.querySelector("#companyname").value
             var contactname=document.querySelector("#contactname").value
             var contacttitle=document.querySelector("#contacttitle").value
             var address=document.querySelector("#address").value
             var region=document.querySelector("#region").value
             var city=document.querySelector("#city").value
             var postalcode=document.querySelector("#postalcode").value
             var country=document.querySelector("#country").value
             var phone=document.querySelector("#phone").value
             var fax=document.querySelector("#fax").value
             
             var obj={customerid:customerid,companyname:companyname,contactname:contactname,contacttitle:contacttitle,address:address,region:region,city:city,postalcode:postalcode,country:country,phone:phone,fax:fax}
            //  console.log(customerid)
             console.log(obj)
             $.post("/newCustomer",obj,function(response){
             });
             alert("Customer Registertion Success");
            };
function newOrder(){

  var customerid=document.querySelector("#custom").value
  var ShipAddress=document.querySelector("#ShipAddress").value
  var shipcity=document.querySelector("#shipcity").value
  var ShipPostalCode=document.querySelector("#ShipPostalCode").value
  var OrderDate=document.querySelector("#OrderDate").value
  var RequiredDate=document.querySelector("#RequiredDate").value
  var ShipVia=document.querySelector("#ShipVia").value
  // var Orderid=document.querySelector("#Orderid").value
  var obj={customerid:customerid,ShipAddress:ShipAddress,shipcity:shipcity,ShipPostalCode:ShipPostalCode,OrderDate:OrderDate,RequiredDate:RequiredDate,ShipVia:ShipVia}

  console.log(obj)
  $.post("/neworder",obj,function(response){
    document.querySelector("#Orderid").value = response
  }) 
};

function newOrderDetails(){
  var Orderid2=document.querySelector("#Orderid").value
  var ProductID=document.querySelector("#ProductID").value
  var Quantity=document.querySelector("#Quantity").value
  var UnitePrice=document.querySelector("#UnitPrice").value

  var obj2={Orderid2:Orderid2,ProductID:ProductID,Quantity:Quantity,UnitePrice: UnitePrice}

  console.log(obj2)
  $.post("/neworderdetail",obj2,function(response){
    
  })    
};

