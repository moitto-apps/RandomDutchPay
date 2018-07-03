function start() {
    controller.catalog().submit("showcase", "auxiliary", "S_DUTCHPAY", {
        "status":"numbers",
        "numbers":"2",
        "has-own-sbml":"yes"
    });

    controller.action("popup", { "display-unit":"S_DUTCHPAY" });
}
