/**
 * Created by Helena on 04.09.2015.
 */

/** -- JSON Structure for the personal author system data --
 *  myAuthorSystem = [scenario1, scenario2, ..., scenarioN, options]
 *      scenario = {name:name, units:[unit1, unit2, ...], connections:[connect1, connect2, ...]}
 *          unit = {name:name, description:text,
 *            contextInformations:[contextInformation1, contextInformation2, ...],
 *            sat:choice,
 *            metaData:[metaData1, metaData2, ...],
 *
 *            posX:number,
 *            posY:number
 *          }
 *              contextInformation = {name:name, operator:name, value:value,
 *                input1:value, input2:value, inputString:value,
 *                parameter1:value, parameter2:value,
 *                icon:path
 *              }
 *              metaData = {name:name, icon:path}
 *      options = {option1:text, option2:text, ...}
 *  **/


function AuthorSystemContent() {

    this._scenarioList = [];
    this._options = {};

    return this;
}

AuthorSystemContent.prototype.getScenarios = function() {
    return this._scenarioList;
};

AuthorSystemContent.prototype.getUnitByUUID = function(uuid) {
    for (var i in this._scenarioList) {
        var unit = this._scenarioList[i].getUnitByUUID(uuid);
        if (unit)
            return unit;
    }
};

AuthorSystemContent.prototype.getScenario = function(scenarioName) {
    for (var i in this._scenarioList) {
        var scenario = this._scenarioList[i];
        if (scenario.getName() == scenarioName)
            return scenario;
    }
};

AuthorSystemContent.prototype.addScenario = function (scenario) {
    this._scenarioList.push(scenario);
};

AuthorSystemContent.prototype.removeScenario = function(scenarioName) {
    for (var i in this._scenarioList) {
        var scenario = this._scenarioList[i];
        if (scenario.getName() == scenarioName)
            this._scenarioList.splice(i, 1);
    }
};

AuthorSystemContent.prototype.getContextInformation = function() {
    var contextList = [];
    for (var i in this._scenarioList) {
        var unitList = this._scenarioList[i].getUnits();
        for (var j in unitList) {
            var unitContext = unitList[j].getContextData();
            for (var k in unitContext) {
                var contextItem = unitContext[k];
                if (contextList.indexOf(contextItem) == -1)
                    contextList.push(contextItem);
            }
        }
    }
    return contextList;
};