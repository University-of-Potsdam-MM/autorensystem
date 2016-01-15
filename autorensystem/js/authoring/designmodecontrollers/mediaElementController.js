var currentmarkedid;

$( document ).ready(function() {
	$(document).on("click", function(e){
		if (!(insidegridelementevent(e)) && !(insidepropertiesareaevent(e))) {
			console.log('inside: ' +  e.pageX + ' ' + e.pageY);
			unmarkmediaallmediaelements();
		}
		//alert("inside: " + insidegridelementevent(e));
		//updateHTML();
		
		$('html').keyup(function(e){
			if(e.keyCode == 46) {
				if (currentmarkedid != 0) {
					var mediatype = $('#'+currentmarkedid).data('mediavalue'); 
					var metadata = '';
					if (mediatype == "picture") {
						metadata = "MD_IMAGE";	
					}
					if (mediatype == "text") {
						metadata = "MD_TEXT";	
					}
					if (mediatype == "sound") {
						metadata = "MD_AUDIO";
					}
					if (mediatype == "video") {
						metadata = "MD_VIDEO";	
					}
					removeMetaDataFromUnit(metadata, $('#'+currentUnitUUID));
					
					$('#' + currentmarkedid).remove();
					unmarkmediaallmediaelements();
				}
			}
		});
		
		
	});
});

function unmarkmediaallmediaelements() {
		$('.optionsmenu').hide();
		$('#pageoptionmenu').show();
		
		currentmarkedid = 0;
		$('.mediaelement').removeClass('borderglowing');

		$( ".mediaelement" ).each(function( index ) {
			if ($(this).data('draggable'))  { // && (!$(obj).draggable('option', 'disabled');)
				$('.mediaelement').draggable('disable');
			}
		});
		
		if (mediamode) {
			$('#media-panel').show();
		}
}

function getmediabuttonsource(id) {
	var out = '<div class="editmediaelementbutton" onClick="markmediaelement(\''+ id + '\')"></div>';
	return out;
}	
	
	function markmediaelement(id) {
		// show menu	
		console.log(id);
		unmarkmediaallmediaelements();
		currentmarkedid = id;
		$('#'+id).addClass('borderglowing');
		$('#'+id).draggable('enable');
		var mediavalue = $('#'+id).data('mediavalue');
		$('.optionsmenu').hide();
		$('#media-panel').hide();
		switch(mediavalue) {
			case 'text':
				$('#textoptionmenu').show();
				texttoeditor();
				break;
			case 'picture':
				//filename = 'picture';
				$('#picoptionmenu').show();
				break;
			case 'sound':
				//filename = 'sound';
				$('#soundoptionmenu').show();
				break;
			case 'video':
				$('#videooptionmenu').show();
				break;
			default:
				$('#pageoptionmenu').show();
			} 
		
		
	}
	
	
	


	
	
function initmediaelementfunctions() {

			$('.mediaelement').click(function(e) {
				if (ismediamode()) {
					markmediaelement($(this).attr('id'));
				}
			});
			
	
			$( '.gridelement' ).droppable({     	
			
			drop: function( event, ui ) {
				var draggedelement=$(ui.draggable);
				
				if (!(draggedelement.attr('id') == 'sizemarker')) {
					tempid = 'me' + newid();
					if (draggedelement.hasClass('mediaelement')) {
						//alert('Draggedelement: ' + draggedelement.attr('id'));
						// switche media elements
						var draggableparent = draggedelement.parent();
						console.log ("Draggable Parent: " + draggableparent.attr('id'));
						var mediaelement1 = $(this).html();
						var mediaelement2 = draggedelement.html();
						//draggableparent.html(mediaelement1);
						
						draggableparent.html(mediaelement1);
						$(this).html('');
						$(draggedelement).appendTo($(this));
						$(draggedelement).css({'top' : '0px'});
						$(draggedelement).css({'left' : '0px'});
						$(draggedelement).css({'height' : '100%'});
						$(draggedelement).css({'width' : '100%'});
						
					
					} else { 
						var metaDatum = '';
						
						$( '#infotext' ).append('gedroppt');
						$( this ).html('<div class="mediaelement" id="'+tempid+'" data-mediavalue="'+ currentdraggedtype +'"></div>');
						if (currentdraggedtype == 'text') {
							$('#'+tempid).css({'background-image' : "url('img/designmode/bg-text.png')"});
							$('#'+tempid).html('<div class="textmediaoutput">Insert your text here</div>');
							metaDatum = "MD_TEXT";
							
						}
						if (currentdraggedtype == 'picture') {
							$('#'+tempid).css({'background-color' : 'LightBlue'});
							$('#'+tempid).css({'background-image' : "url('img/designmode/bg-pic.png')"});
							metaDatum = "MD_IMAGE";
						}
						
						if (currentdraggedtype == 'sound') {
							$('#'+tempid).css({'background-image' : "url('img/designmode/bg-sound.png')"});
							$('#'+tempid).css({'background-color' : 'orange'});
							metaDatum = "MD_AUDIO";
						}
						
						if (currentdraggedtype == 'video') {
							$('#'+tempid).css({'background-image' : "url('img/designmode/bg-video.png')"});
							metaDatum = "MD_VIDEO";
						}
						addMetaDataToUnit(metaDatum, $('#'+currentUnitUUID));
						setmediaicons(tempid);
					}
					updateHTML();
					$( 'body' ).unbind();
					init2();
					unmarkmediaallmediaelements();
					hidemarker();
					$('#'+tempid).draggable('disable');
				}
			  //.addClass( "bgcolor" )
			}
			

		});
	
};


// TODO -> Zusammenfassen
function insidegridelementevent(e) {
	if (!(typeof e === "undefined")) {
		return insidegridelement(e.pageX, e.pageY);
	} else {
		console.log("achtung undefined");
		return false;
	}
}

function insidegridelement(mx, my) {
	//console.log("Test: " +  mx + ' ' + my );
	if (!((typeof mx === "undefined") || (typeof my === "undefined"))) {
		

	
		var gridtop 	= $('#gridcontainer').offset().top;
		var gridbottom 	= $('#gridcontainer').offset().top  + $('#gridcontainer').height();
		var gridleft 	= $('#gridcontainer').offset().left;
		var gridright 	= $('#gridcontainer').offset().left + $('#gridcontainer').width();
		
		return ((mx>gridleft && mx<gridright) && (my>gridtop && my<gridbottom));	
	} 
	else {
		console.log('undefined'); 
		return false;
	};
		
}

function insidepropertiesareaevent(e) {
	return insidepropertiesarea(e.pageX, e.pageY);
}

function insidepropertiesarea(mx, my) {
	//console.log("Test: " +  mx + ' ' + my );
	var gridtop 	= $('.properties').offset().top;
	var gridbottom 	= $('.properties').offset().top  + $('.properties').height();
	var gridleft 	= $('.properties').offset().left;
	var gridright 	= $('.properties').offset().left + $('.properties').width();
	
	return ((mx>gridleft && mx<gridright) && (my>gridtop && my<gridbottom));	
}

