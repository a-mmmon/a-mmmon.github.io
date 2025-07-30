function calculateVat() {
    const basePrice = $("#basePrice").val();
    const vatRate = 7;
    const vat = basePrice * (vatRate / 100);
    console.log(basePrice, vatRate, vat);
    $("#result").html(
        `<p>Base Price: ${basePrice}</p>
         <p>VAT Rate: ${vatRate}%</p>
         <p>VAT Amount: ${vat.toFixed(2)}</p>
         <p>Total Price: ${(parseFloat(basePrice) + vat).toFixed(2)}</p>`

    )
}

function calculateReverseVat() {
    const pv = $("#priceWithVat").val();
    const vatRate = 7;
    const basePrice = pv / (1 + (vatRate / 100));
    const vat = pv - basePrice;
    console.log(pv, vatRate, basePrice, vat);
    $("#reverseResult").html(
        `<p>Total Price: ${pv}</p>
         <p>VAT Rate: ${vatRate}%</p>
         <p>Base Price: ${basePrice.toFixed(2)}</p>
         <p>VAT Amount: ${vat.toFixed(2)}</p>`
    )
}