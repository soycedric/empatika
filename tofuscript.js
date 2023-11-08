var tofuNumber; 
var mayoNumber;
var stringWhats = "Quiero comprar ";
    
    function getTofu(){
  var tNumber = document.getElementById("tofuNumberIn").value;
      tofuNumber = tNumber;
      var button = document.getElementById("tofuButton");
      button.disabled = true;
      tofuString = `${tofuNumber} tofu/s, `;
      stringWhats += tofuString
    }
     
    function getMayo(){
  var mNumber = document.getElementById("mayoNumberIn").value;
      mayoNumber = mNumber;
      var button = document.getElementById("mayoButton");
      button.disabled = true;
      mayoString = `${mayoNumber} veganesa/s, `;
      stringWhats += mayoString
}

var url = "";

function sendWhats(){
    var encodedString = encodeURIComponent(stringWhats);  
url = `https://wa.me/522224026359?text=${encodedString}`;
}
