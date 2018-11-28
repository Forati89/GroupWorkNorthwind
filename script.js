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
function saveCustomer()
         {
             var customerid=document.querySelector("#customerid").value
             var companyname=document.querySelector("#companyname").value
             var contactname=document.querySelector("#contactname").value
             var contactitle=document.querySelector("#contactitle").value
             var address=document.querySelector("#address").value
             var region=document.querySelector("#region").value
             var city=document.querySelector("#city").value
             var postalcode=document.querySelector("#postalcode").value
             var country=document.querySelector("#country").value
             var phone=document.querySelector("#phone").value
             var fax=document.querySelector("#fax").value
             
             var obj={customerid: customerid, companyname: companyname,contactname: contactname,contactitle: contactitle,address: address,region: region,city: city,postalcode: postalcode,country: country,phone: phone,fax: fax}
            //  console.log(customerid)
             console.log(obj)
             $.post("/newCustomer",obj,function(response){
             })
            };

  
    
