var account = require("account");
var wallet  = require("wallet");

var __current_coin_price = null;

function on_loaded() {
    if ($data["status"] === "amount") {
        //wallet.get_coin_price("KRW", "SBD", function(price) {
            __current_coin_price = 1700.0;

            __update_coin_amount();
        //});

        return;
    }

    if ($data["status"] === "random") {
        calculate_random_pays();

        return;
    }
}

function on_change_amount() {
    if (__current_coin_price) {
        __update_coin_amount();
    }
}

function add_numbers() {
    var label = view.object("label.numbers");
    var numbers = Math.min(9, parseInt(label.value()) + 1);

    label.property({ "text":numbers.toString() });
}

function subtract_numbers() {
    var label = view.object("label.numbers");
    var numbers = Math.max(2, parseInt(label.value()) - 1);

    label.property({ "text":numbers.toString() });
}

function next_to_amount() {
    var value = controller.catalog().value("showcase", "auxiliary", "S_DUTCHPAY");
    var numbers = view.object("label.numbers").value();

    controller.catalog().submit("showcase", "auxiliary", "S_DUTCHPAY", Object.assign(value, {
        "status":"amount",
        "numbers":numbers
    }));

    controller.action("popup", { "display-unit":"S_DUTCHPAY" });    
}

function next_to_random() {
    var value = controller.catalog().value("showcase", "auxiliary", "S_DUTCHPAY");
    var currency_amount = parseFloat(view.object("amount").value() || "0");
    var coin_amount = (currency_amount / __current_coin_price).toFixed(3);

    controller.catalog().submit("showcase", "auxiliary", "S_DUTCHPAY", Object.assign(value, {
        "id":"S_DUTCHPAY",
        "status":"random",
        "amount":coin_amount
    }));

    controller.action("popup", { "display-unit":"S_DUTCHPAY" });    
}

function calculate_random_pays() {
    
    
    timeout(3, function() {
        next_to_pays();
    });
}

function next_to_pays() {
    var value = controller.catalog().value("showcase", "auxiliary", "S_DUTCHPAY");

    controller.catalog().submit("showcase", "auxiliary", "S_DUTCHPAY", Object.assign(value, {
        "status":"pays"
    }));

    controller.action("popup", { "display-unit":"S_DUTCHPAY" });    
}

function __update_coin_amount() {
    var currency_amount = parseFloat(view.object("amount").value() || "0");
    var coin_amount = (currency_amount / __current_coin_price).toFixed(3);

    view.object("label.amount.coin").property({ "text":coin_amount.toString() + " SBD"});
}

