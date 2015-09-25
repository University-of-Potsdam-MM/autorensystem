/**
 * Created by juliushofler on 06.04.15.
 */


function parseContextInfoXML () {

    // http://localhost:9998/xml/get-context-information
    // build url
    var domain = "localhost";
    var port = "9998";
    var uri = "/xml/get-context-information";
    var url = "http://" + domain + ":" + port + uri;

    // get context information from xml file
    $.ajax({
        type: "GET",
        url: "measurable-context-information.xml",
        //url: url,
        dataType: "xml",

        // if file is available parse out all information
        success: function(xml) {

            // parse all needed information from the xml file
            $('information', xml).each(function() {


                /* get the name of the information */
                var originalName = this.getAttribute("id");
                var name = {
                    translation:translate_contextInformation(originalName),
                    original:originalName
                };


                /* get the context classes from the current information */
                var array_classes = [];
                array_classes.name = "Context Classes";

                // get all classes and put them into an array
                $('contextClasses', this).children().each(function() {
                    var contextClassId = this.getAttribute("id");
                    array_classes.push({
                        translation:translate_contextClass(contextClassId),
                        original:contextClassId
                    });
                });



                /* get the context values from the current information */
                var contextValue = $('contextValue', this);

                // 1. type of context value
                // get border minimum if given, else null
                // get border maximum if given, else null
                // get default value if given, else null
                var contextValueAttributes = {
                    type:contextValue[0].getAttribute("type"),
                    min:contextValue[0].getAttribute("min"),
                    max:contextValue[0].getAttribute("max"),
                    default:contextValue[0].getAttribute("default")
                };


                // 2. all possible operators
                var array_operators = [];
                array_operators.name = "Operators";

                contextValue.children("operators").children().each(function() {
                    var operatorId = this.getAttribute("id");
                    array_operators.push({
                        translation:translate_operator(operatorId),
                        original:operatorId
                    });
                });


                // 3. all possible values
                var array_possibleValues = [];
                array_possibleValues.name = "Possible Values";

                contextValue.children("possibleValues").children().each(function() {
                    var possibleValue = this.innerHTML;
                    array_possibleValues.push({
                        translation:translate_possibleValue(possibleValue),
                        original:possibleValue
                    });
                });


                // combine attributes, operators, and possible values in one object
                var value = {
                    name:"Context Value",
                    attributes:contextValueAttributes,
                    operators:array_operators,
                    enums:array_possibleValues
                };


                /* get the parameters (if parameter section exists) */
                var array_parameters = [];
                array_parameters.name = "Parameters (id, type, values)";

                // for each parameter
                $('parameters', this).children("parameter").each(function() {

                    // get id of parameter
                    var pid = this.getAttribute("id");
                    var id = {
                        translation:translate_parameter(pid),
                        original:pid
                    };

                    var array_paramValues = [];

                    // all parameter values
                    var paraValue = $(this).children("parameterValue");
                    paraValue.each(function() {

                        // get the type of each parameter value
                        var type = this.getAttribute("type");

                        // different types have different values
                        switch (type) {

                            case "ENUM":
                                // get the only possible values for this parameter
                                paraValue.children("possibleValues").children("value").each(function() {
                                    var valueId = this.innerHTML;
                                    array_paramValues.push({
                                        translation:translate_parameterValues(valueId),
                                        original:valueId
                                    });
                                    array_paramValues.name = "Possible Values";
                                });
                                break;

                            case "FLOAT":
                                // floats have always a minimum and maximum value
                                array_paramValues.push({
                                    min:this.getAttribute("min"),
                                    max:this.getAttribute("max")}
                                );
                                array_paramValues.name = "Minimum and Maximum Values";
                                break;

                            case "INTEGER":
                            case "STRING":
                                break;
                        }

                        // push all parameters into an array
                        array_parameters.push({
                            name:"Parameter",
                            id:id,
                            type:type,
                            values:array_paramValues
                        });

                    });
                });


                // gather all information
                var contextInformation = {
                    name:name,
                    classes:array_classes,
                    value:value,
                    parameters:array_parameters
                };

                array_ContextInformations.push(contextInformation);
            });

            // TODO: Put this in its place (create entry point for entire app)!
            // after finishing the parsing, elements could be added into tab bar
            fillContextTab();
            fillMetadataTab();
        }
    });

    return array_ContextInformations;
}


// translate context information into german
var dictionary_optionsContextInfos = {};
/**
 * Functions translate context information into german.
 * @param {String} ci Contains a context information
 * return translated context information
 * */
function translate_contextInformation(ci) {

    switch (ci) {
        case "CI_CURRENT_LEARNING_UNIT":
            var gci = "Momentane Lerneinheit";
            break;
        case "CI_FINISHED_LEARNING_UNIT":
            gci = "Lerneinheit abgeschlossen";
            break;
        case "CI_USER_DID_PERFORM_ACTION":
            gci = "Benutzer (Aktion)";
            break;
        case "CI_AUDIO_OUTPUT_AVAILABLE":
            gci = "Ton verfügbar";
            break;
        case "CI_CURRENT_AIR_PRESSURE":
            gci = "Aktueller Luftdruck";
            break;
        case "CI_CURRENT_AMBIENT_NOISE":
            gci = "Aktuelle Umgebungsgeräusche";
            break;
        case "CI_CURRENT_APPOINTMENT":
            gci = "Aktueller Termin";
            break;
        case "CI_CURRENT_HUMIDITY":
            gci = "Aktuelle Luftfeuchtigkeit";
            break;
        case "CI_CURRENT_LUMINOSITY":
            gci = "Aktuelle Lichtstärke";
            break;
        case "CI_CURRENTLY_RAINING":
            gci = "Regnerisch";
            break;
        case "CI_CURRENTLY_SUNNY":
            gci = "Sonnig";
            break;
        case "CI_CURRENT_TEMPERATURE":
            gci = "Aktuelle Temperatur";
            break;
        case "CI_CURRENT_TIME":
            gci = "Aktuelle Uhrzeit";
            break;
        case "CI_DEVICE_TYPE":
            gci = "Gerätetyp";
            break;
        case "CI_DISPLAY_RESOLUTION":
            gci = "Displayauflösung";
            break;
        case "CI_EXPECTED_TIME_NEEDED_FOR_COMPLETION":
            gci = "Erwartete benötigte Restzeit";
            break;
        case "CI_EXTERNAL_DISPLAY_AVAILABLE":
            gci = "Externer Bildschirm verfügbar";
            break;
        case "CI_HAS_SCREEN_READER_FUNCTIONALITY":
            gci = "Hat Screenreader Funktionalität";
            break;
        case "CI_MICROPHONE_AVAILABLE":
            gci = "Mikrofon verfügbar";
            break;
        case "CI_NEXT_APPOINTMENT":
            gci = "Nächster Termin";
            break;
        case "CI_PHOTO_CAMERA_AVAILABLE":
            gci = "Fotokamera verfügbar";
            break;
        case "CI_PRINTER_AVAILABLE":
            gci = "Drucker verfügbar";
            break;
        case "CI_TIME_UNTIL_TIMESTAMP":
            gci = "Zeit bis zum Zeitstempel";
            break;
        case "CI_USER_AGE":
            gci = "Alter des Benutzers";
            break;
        case "CI_USER_CURRENT_LEARNING_STYLE_INPUT":
            gci = "Momentaner Benutzerlernstil";
            break;
        case "CI_USER_CURRENT_LEARNING_STYLE_PERCEPTION":
            gci = "Momentaner Benutzerstilempfindung";
            break;
        case "CI_USER_CURRENT_LEARNING_STYLE_PROCESSING":
            gci = "Momentaner Benutzerstilverarbeitung";
            break;
        case "CI_USER_CURRENT_LEARNING_STYLE_UNDERSTANDING":
            gci = "Momentaner Benutzerstilverständnis";
            break;
        case "CI_USER_DESTINATION":
            gci = "Ziel des Benutzers";
            break;
        case "CI_DID_ARRIVE_AT_LOCATION":
            gci = "An Standort angekommen";
            break;
        case "CI_DID_LEAVE_LOCATION":
            gci = "Standort verlassen";
            break;
        case "CI_IS_AT_LOCATION":
            gci = "Ist am Standort";
            break;
        case "CI_USER_LOCATION_ADDRESS":
            gci = "Adresse am Standort";
            break;
        case "CI_USER_LOCATION_BUILDING":
            gci = "Gebäude am Standort";
            break;
        case "CI_USER_LOCATION_COUNTRY":
            gci = "Land am Standort";
            break;
        case "CI_USER_LOCATION_DISTANCE":
            gci = "Abstand zum Standort";
            break;
        case "CI_USER_LOCATION_LATITUDE":
            gci = "Standort Breitengrad";
            break;
        case "CI_USER_LOCATION_LONGITUDE":
            gci = "Standort Längengrad";
            break;
        case "CI_USER_LOCATION_REGION":
            gci = "Region am Standort";
            break;
        case "CI_USER_MEANS_OF_TRANSPORTATION":
            gci = "Transportmittel des Benutzers";
            break;
        case "CI_USER_MOVEMENT_SPEED":
            gci = "Fortgebewegungsgeschw. des Benutzers";
            break;
        case "CI_USER_ROLE":
            gci = "Benutzerrolle";
            break;
        case "CI_VIDEO_CAMERA_AVAILABLE":
            gci = "Videokamera verfügbar";
            break;
        case "CI_USER_STATE_OF_MIND":
            gci = "Gemütszustand des Benutzers";
            break;
    }
    dictionary_optionsContextInfos[ci] = gci;
    return gci;
}

// translate context classes into german
/**
 * Functions translate context class into german.
 * @param {String} cc Contains a context class
 * return translated context class
 * */
function translate_contextClass(cc) {

    switch (cc) {
        case "CC_SCENARIO":
            cc = "Lernszenario";    // color: #3287C8
            break;
        case "CC_PERSONAL":
            cc = "Persönlich";      // color: #AF46C8
            break;
        case "CC_SITUATIONAL":
            cc = "Situationsbezogen";   // color: #91F52D
            break;
        case "CC_TECHNICAL":
            cc = "Infrastruktur";   // color: #969696
            break;
        case "CC_PHYSICAL":
            cc = "Umwelt";        // color: #FADC3C
            break;
        case "CC_LOCATION":
            cc = "Ortung";      // color: #F03C32
            break;
    }
    return cc;
}

// translate operator into german
/**
 * Functions translate operator into german.
 * @param {String} op Contains a operator
 * return translated operator
 * */
function translate_operator(op) {

    switch (op) {
        case "CONTAINS":
            op = "beinhaltet";
            break;
        case "IS":
            op = "ist";
            break;
        case "IS_NOT":
            op = "ist nicht";
            break;
        case "NO_VALUE":
            op = "hat keinen Wert";
            break;
        case "GREATER_THEN":
            op = "ist größer als";
            break;
        case "LESS_THEN":
            op = "ist kleiner als";
            break;
    }
    return op;
}

// translate context parameter into german
/**
 * Functions translate context parameter into german.
 * @param {String} cp Contains a context parameter
 * return translated context parameter
 * */
function translate_possibleValue(cp) {

    switch (cp) {
        case "ACTIVATE_ACTION":
            cp = "aktiviert";
            break;
        case "CHOOSE_ACTION":
            cp = "wählt";
            break;
        case "DEACTIVATE_ACTION":
            cp = "deaktiviert";
            break;
        case "RESUME_ACTION":
            cp = "setzt fort";
            break;
        case "SUSPEND_ACTION":
            cp = "unterbricht";
            break;
        case "WATCH_ACTION":
            cp = "beobachtet";
            break;
        case "VIEW_ACTION":
            cp = "sieht";
            break;
        case "USE_ACTION":
            cp = "benutzt";
            break;
        case "LISTEN_ACTION":
            cp = "hört";
            break;
        case "READ_ACTION":
            cp = "liest";
            break;
        case "FEATURE_PHONE":
            cp = "Handy";
            break;
        case "TABLET_COMPUTER":
            cp = "Tablet";
            break;
        case "SMARTPHONE":
            cp = "Smartphone";
            break;
        case "SMARTWATCH":
            cp = "Smartwatch";
            break;
        case "AFOOT":
            cp = "zu Fuß";
            break;
        case "BY_BIKE":
            cp = "mit dem Fahrrad";
            break;
        case "STUDENT":
            cp = "Student/Lernender";
            break;
        case "TEACHER":
            cp = "Lehrer";
            break;
        case "UNKNOWN":
            cp = "Unbekannt";
            break;
        case "TRANSPORTATION":
            cp = "Auto/Öffentliche Verkehrsmittel";
            break;
    }
    return cp;
}

// translate parameter into german
/**
 * Functions translate parameter into german.
 * @param {String} p Contains a parameter
 * return translated parameter
 * */
function translate_parameter(p) {

    switch (p) {
        case "CP_ACTION_START_TIMESTAMP":
            p = "Startzeit";
            break;
        case "CP_ACTION_END_TIMESTAMP":
            p = "Endzeit";
            break;
        case "CP_ACTION_REFERNCED_LEARNING_NUGGET":
            p = "Referenzierte Lerneinheit";
            break;
        case "CP_APPOINTMENT_DETAIL":
            p = "Termindetails";
            break;
        case "CP_PRESSURE_UNIT":
            p = "Luftdruck Einheit";
            break;
        case "CP_TEMPERATURE_SCALE":
            p = "Temperaturskala";
            break;
        case "CP_TIME_COMPONENT":
            p = "Zeitstelle";
            break;
        case "CP_RESOLUTION_COMPONENT":
            p = "Auflösungsmaß";
            break;
        case "CP_RESOLUTION_UNIT":
            p = "Auflösungseinheit";
            break;
        case "CP_LEARNING_UNIT_ID":
            p = "Lerneinheits-ID";
            break;
        case "CP_TARGET_LATITUDE":
            p = "Breitengrad";
            break;
        case "CP_TAGET_LATITUDE":
            p = "Breitengrad";
            break;
        case "CP_TARGET_LONGITUDE":
            p = "Längengrad";
            break;
        case "CP_LATITUDE":
            p = "Breitengrad";
            break;
        case "CP_LONGITUDE":
            p = "Längengrad";
            break;
        case "CP_DISTANCE_UNIT":
            p = "Distanzeinheit";
            break;
        case "CP_VELOCITY_UNIT":
            p = "Geschwindigkeitseinheit";
            break;
        case "CP_STATE_OF_MIND":
            p = "Gemütszustand";
            break;
    }
    return p;
}

// translate parameter values into german
/**
 * Functions translate parameter values into german.
 * @param {String} pv Contains a parameter value
 * return translated parameter value
 * */
function translate_parameterValues(pv) {

    switch (pv) {
        case "BAR":
            pv = "Bar";
            break;
        case "MILLIMETER_OF_MERCURY":
            pv = "Millimeter in Quecksilbersäule";
            break;
        case "PASCAL":
            pv = "Pascal";
            break;
        case "TORR":
            pv = "Torr";
            break;
        case "DATE":
            pv = "Datum";
            break;
        case "LOCATION":
            pv = "Ort";
            break;
        case "NOTES":
            pv = "Anmerkung";
            break;
        case "TIME":
            pv = "Uhrzeit";
            break;
        case "TITLE":
            pv = "Titel";
            break;
        case "CELSIUS":
            pv = "Celsius";
            break;
        case "FAHRENHEIT":
            pv = "Fahrenheit";
            break;
        case "KELVIN":
            pv = "Kelvin";
            break;
        case "HOURS":
            pv = "Stunde";
            break;
        case "MINUTES":
            pv = "Minute";
            break;
        case "SECONDS":
            pv = "Sekunde";
            break;
        case "WIDTH":
            pv = "Breite";
            break;
        case "HEIGHT":
            pv = "Höhe";
            break;
        case "PIXELS":
            pv = "Pixel";
            break;
        case "POINTS":
            pv = "Punkte";
            break;
        case "CENTIMETERS":
            pv = "Centimeter";
            break;
        case "KILOMETERS":
            pv = "Kilometer";
            break;
        case "MILES":
            pv = "Meilen";
            break;
        case "KILOMETERS_PER_HOUR":
            pv = "km/h";
            break;
        case "MILES2_PER_HOUR":
            pv = "mph";
            break;
        case "ANGER":
            pv = "Verärgert";
            break;
        case "BOREDOM":
            pv = "Gelangweilt";
            break;
        case "CONCENTRATION":
            pv = "Konzentriert";
            break;
        case "CONFUSION":
            pv = "Verwirrt";
            break;
        case "CURIOSITY":
            pv = "Neugierig";
            break;
        case "DISTRACTION":
            pv = "Abgelenkt";
            break;
        case "HAPPINESS":
            pv = "Fröhlich";
            break;
        case "OPTIMISM":
            pv = "Optimistisch";
            break;
        case "SADNESS":
            pv = "Traurig";
            break;
        case "TIREDNESS":
            pv = "Erschöpft";
            break;
    }
    return pv;
}
