function search(searchField, insertTH, insertTB, query){

    function send()
    {
     var customerID=document.querySelector(searchField).value
      var url=query+customerID
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

  
    
