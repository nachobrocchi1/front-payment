function paymentFunction() {
    window.console.info("Paying..")
    var request = new Map();

    window.console.info("card:" + document.getElementById("cardnumber").value)
    window.console.info("name:" + document.getElementById("name").value)
    window.console.info("expirationdate:" + document.getElementById("expirationdate").value)
    window.console.info("securitycode:" + document.getElementById("securitycode").value)


    var card_number = document.getElementById("cardnumber").value.replace(/\s+/g, '');
    var expiration_date = document.getElementById("expirationdate").value.replace("/", "");
    var card_code = document.getElementById("securitycode").value
    var d = new Date()
    var datestring = ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2);
    var timestring = ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2);
    var daystring = ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2);

    var data = {
        mti: "0200",                        // Request for a payment
        fields: {
            2: card_number,                 // Primary Account Number
            3: "000001",                    // Processing code
            4: "000000001000",              // Amount - 1000
            7: datestring,                  // Transmission date - today
            12: timestring,                 // Time - now
            13: daystring,                  // Date - today
            14: expiration_date,            // Card expiration date
            19: "032",                      // Country Code - ARG
            22: card_code,                  // Point of service entry mode - security code
            41: "A1B2C3D4",                 // Terminal ID
            43: "ISO 8583 to JSON Test,La Plata...,BA,AR.",    // Card acceptor adddress
            49: "840"                       // Currency - USD
        }
    }
    window.console.info("request: " + JSON.stringify(data))

    fetch('https://api-iso8583-to-json.herokuapp.com/iso2json', {
        method: 'POST', body: JSON.stringify(data)
    }).then(
        function (response) {
            return response.json()
        }
    ).then(data => {
        console.log(data)
        // res = JSON.parse(data.)
        document.getElementById("response").style.visibility="visible"
        document.getElementById("ResponseJSON").innerHTML = JSON.stringify({
            mti: data.mti,
            fields: data.fields
        })
        document.getElementById("RequestBytes").innerHTML = data.requestBytes
        document.getElementById("ResponseBytes").innerHTML = data.responseBytes
    })

}