guis = [];

function createNewGUI(unitid) {
	var newGUIHTML = 	'<div id="gridcontainer" class="centered" data-ratioheight="3" data-ratiowidth="4" data-idcounter="0" data-padding="1" data-showborders="true" data-gridpadding="1" data-unitid="' + unitid + '" style="display:block"><div class="gridelement" value="0" style="width:100%;height:100%;top:0%;left:0%;" id="' + unitid + '">Test</div></div>';
	//addHTML(unitid, newGUIHTML);
	return newGUIHTML; 
};


function addCurrentGUI() {
	console.log("vorher: " + JSON.stringify(guis));
	var currentjson = grid2json();
	index = getGUIIndex(currentUnitUUID);
	if (index==-1) {
		guis.push(currentjson);
		console.log("create: " + JSON.stringify(guis));
	} else {
		guis[index] = currentjson;
		console.log("updated: " + JSON.stringify(guis));
	}
	console.log('Autorensystem: ' + JSON.stringify(authorSystemContent));
}

function getGUIIndex(unitid) {
	out = -1;
	for (i=0; i<guis.length; i++) {
		console.log("aktuelle Gui:" + JSON.stringify(guis[i]));
		console.log("guis " + i + " = guis[i].unitid");
		console.log(guis[i].unitid + " =? " + unitid);
		if (guis[i].unitid == unitid) {
			out = i;
		}
	 }
	 return out;
}








function loadorcreateGUIHTML(unitid) {
	var out;
	if (getGUIIndex(unitid) ==-1) {
		out = createNewGUI(unitid);
		console.log("create: " + unitid);
		console.log(JSON.stringify(guis));
	} else {
		out = getGUIHTML(unitid);
		console.log("load: " + unitid);
		console.log(JSON.stringify(guis));
	}
	//$('#gridcontainer').replaceWith(out);
	//init2();
}


function getGUIHTML(unitid) {
	 out = {};
	 //alert(JSON.stringify(guisHTML));
	 for (i=0; i<guis.length; i++) {
		//alert(JSON.stringify(guisHTML[i].unitid));
		if (guis[i].unitid == unitid) {
			var ausgabe = json2grid(guis[i]);
			alert('ausgabe: ' + ausgabe);
		}
	 }
	 init2();
}




function updateHTML() {
	addCurrentGUI();
	authorSystemContent.guis = guis;
}

/* Controller */
$( document ).ready(function() {
	$("#metaDataTab").on("click", function(){
		loadorcreateGUIHTML(currentUnitUUID);
		resizegridcontainer();
	});
	
	
	$( "#gridcontainer" ).find( "*" ).on("click", function(e){
			//updateHTML();
			alert(test);
		//alert("inside: " + insidegridelementevent(e));
		//updateHTML();
	});
	
	// Aktualisierung
	
	// TODO: Fehlerabfangen moeglich? (wenn grafische darstellung nichts mit dem aktuelle Typ zu tun hat)
/*	$(document).on("click", function(e){
		if (insidegridelementevent(e)) {
			//updateHTML();
			console.log('inside: ' +  e.pageX + ' ' + e.pageY);
		}
		//alert("inside: " + insidegridelementevent(e));
		//updateHTML();
	});
	
	$(document).on("mouseup", function(e){
		//updateHTML();
	});
	
	$(document).on("mousedown", function(e){
		//updateHTML();
	});
*/	
 $(document).keypress(function(e) {
  if(e.which == 65) {
    for(var b in window) { 
		if(window.hasOwnProperty(b)) console.log(b); 
	}
  }
  });
  
  
  $("#showHelp").click(function(e) {
    for(var b in window) { 
		if(window.hasOwnProperty(b)) console.log(b); 
	}
  });
 
});




