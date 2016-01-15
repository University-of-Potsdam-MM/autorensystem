/**
 * Created by tobias on 13.01.16.
 */

$(function() {
    // sets the trigger for if save scenario was clicked
    $("#exportScenario").on("click", function() {
        exportScenario();
    });
});

function exportScenario() {
    // get current scenario name
    var currentScenario = $("#lname")[0].innerHTML;
    if (currentScenario == "") {
        alert("Sie müssen erst ein Szenario erstellen, bevor Sie es exportieren können.");
        return false;
    }

    replaceScenarioNamesWithReferences();

    var JSONLD = authorSystemContent.getScenario(currentScenario).getABoxJSONLD();

    $.ajax({
        url: "http://localhost:9998/noderules/get-adaptation-rules",
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: {"ontologyABox": JSON.stringify(JSONLD)},
        dataType: "text",
        success: function(response) {
            console.log(response);
            $.ajax({
                url: "/saveExport",
                type: "POST",
                data: {
                    rules: response,
                    content: JSON.stringify({})
                },
                success: function(response) {
                    alert("Export war erfolgreich.")
                },
                error: function(err, textStatus) {
                    console.log(textStatus);
                    alert("Fehler beim Speichern des Exports.")
                }
            });
        },
        error: function(err, textStatus) {
            console.log(textStatus);
            alert("Fehler beim Erstellen der Adaptionsregeln.")
        }
    });
}