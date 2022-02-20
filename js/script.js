function compute_profit(){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.kraken.com/0/public/Ticker?pair=XXBTZEUR', true)

    request.onload = function () {
    // Begin accessing JSON data here
    
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        
        //Last BTC-EUR trade price
        var recent_price = parseFloat(data.result.XXBTZEUR.c[0]);
        
        var inputs = document.getElementById("BTC-form").elements;
        var img = document.getElementById("img-stonks");
        var quantity = inputs["quantity"].value;
        quantity = quantity.replace(",",".");
        var price = inputs["price"].value;
        price = price.replace(",",".");
        console.log("price is "+price+" and quantity "+quantity);
        var resultDiv = document.getElementById("result");
        if(quantity != "" && price != "" && quantity > 0 && price > 0){
            
            //compute variation of BTC price
            var variation = (((recent_price - price)/ price) * 100);
            
            //compute BTC price
            var profit = (quantity*recent_price - quantity*price);
            
            if (variation >= 0){
                resultDiv.style.color = "#FF4500";
                img.src = 'images/stonks.jpg';
            }
            else{
                resultDiv.style.color = "#9494FF";
                img.src = 'images/not-stonks.jpg';
            }
            
            if (profit >= 0)
                resultDiv.innerHTML = "<p>Il prezzo corrente di BTC-EUR è di "+recent_price.toFixed(2)+" euro, da quando hai acquistato è aumentato del "+variation.toFixed(2)+"%.</p><p>Hai guadagnato "+profit.toFixed(2)+" euro.</p>";
            else
                resultDiv.innerHTML = "<p>Il prezzo corrente di BTC-EUR è di "+recent_price.toFixed(2)+" euro, da quando hai acquistato è diminuito del "+variation.toFixed(2)+"%.</p><p>Hai perso "+profit.toFixed(2)+" euro.</p>";
        }
       
    }

    // Send request
    request.send()
    
}