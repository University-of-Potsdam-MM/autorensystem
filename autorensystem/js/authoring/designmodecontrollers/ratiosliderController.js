		var activeratio = "4:3";

$(function() {
		var ratiovalues = ["16:9", "16:10", "3:2", "4:3", "1:1", "3:4", "2:3", "10:16", "9:16"];
		$(".ratioslider").slider({max:8, orientation: "horizontal", step:1,
        // default properties
        create: function() {
            valueSlider = 0;
            scaleSlider = 0;
        },
		slide: function(event, ui) {
			aspectratio = ratiovalues[ui.value];
			$("#chosenratio").text( aspectratio );
		},
        change: function(event, ui) {

			aspectratio = ratiovalues[ui.value];
			$("#chosenratio").text( aspectratio );
			//aspectratio = ratiovalues[ui.value] * 1;
			updateHTML();
			
			switch (ui.value) {
				case 0:
					aspectratio = 1*(16/9);
					break;
				case 1:
					aspectratio = 1*(16/10);
					break;
				case 2:
					aspectratio = 1*(3/2);
					break;
				case 3:
					aspectratio = 1*(4/3);
					break;
				case 4:
					aspectratio = 1*(1/1);
					break;
				case 5:
					aspectratio = 1*(3/4);
					break;
				case 6:
					aspectratio = 1*(2/3);
					break;
				case 7:
					aspectratio = 1*(10/16);
					break;
				case 8:
					aspectratio = 1*(9/16);
					break;
			}
			//aspectratio = 1 * aspectratio;
			//alert(aspectratio);
			resizegridcontainer();
        }})
        // add pips and label to slider
        .slider("pips", {first:"label", last:"label", labels:{"first":"-", "last":"+"}});
});		
