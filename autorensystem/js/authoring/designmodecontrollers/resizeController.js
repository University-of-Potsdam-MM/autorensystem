
$( document ).ready(function() {



	
		$('#sizemarker').draggable({
			start: function( event, ui ) {
				console.log('dragstart');
				sizemarkerdragged = true;
				$('#divisionmarker').hide();
				if (sizemarkerelement1 != 0) {
					getverticalsnappoint($('#'+sizemarkerelement1));
				}
			},
			stop: function( event, ui ) {
				
				console.log('dragstop');
				sizemarkerdragged = false;
				if ((sizemarkerelement1 != 0) && (sizemarkerelement2 != 0) && (sizemarkerdir != 'undef')) {
					// Teste, ob sich der Marker im zulaessigen Bereich befindet (innerhalb der Elemente, zwischen denen sich die zu verschiebene Grenze befindet)
					if (sizemarkerdir == 'horizontal') {
						if (($('#sizemarker').offset().left-30) > ($('#'+sizemarkerelement1).offset().left)) { 
							if (($('#sizemarker').offset().left+30) < ($('#'+sizemarkerelement2).offset().left)+$('#'+sizemarkerelement2).outerWidth()) { 
								changesize(sizemarkerelement1, sizemarkerelement2, $('#sizemarker').offset().left+3, $('#sizemarker').offset().top);
							}
						}
					} 
					if (sizemarkerdir == 'vertical') {
						if (($('#sizemarker').offset().top-30) > ($('#'+sizemarkerelement1).offset().top)) { 
							if (($('#sizemarker').offset().top+30) < ($('#'+sizemarkerelement2).offset().top)+$('#'+sizemarkerelement2).outerHeight()) { 
								changesize(sizemarkerelement1, sizemarkerelement2, $('#sizemarker').offset().left, $('#sizemarker').offset().top+3);
							}
						}
					}
				}
				
				$('#sizemarker').hide();
			},

			
		});
		
		
		$( '#sizemarker' ).draggable({ snap: '.resizesnapper' });
		


		
});

	// Verschiebung der Grenze zwischen zwei benachbarten Feldern (gridelements) durch Veraendern der Groessen dieser Elemente
	function changesize(element1, element2, markerleft, markertop) {
		if ((element1!=0) && (element2!=0)) {
			if (sizemarkerdir == 'horizontal') {
				$( "#sizemarker" ).draggable({ axis: "x" });
				var border = $('#'+element1).offset().left + $('#'+element1).outerWidth();
				var bothelementformerwidthpercent = parseFloat($('#'+element1)[0].style.width) + parseFloat($('#'+element2)[0].style.width); 
				var newwidthpx = markerleft - $('#'+element1).offset().left;
				var difffactor = (newwidthpx / $('#'+element1).outerWidth()); // Teilungsverhaeltnis
				var element1newwidth = difffactor*parseFloat($('#'+element1)[0].style.width);
				element1newwidth = Math.round(element1newwidth*10) /10;
				var element1newleft  = parseFloat($('#'+element1)[0].style.left);
				$('#'+element1).css({'width' : element1newwidth + '%'});
				$('#'+element2).css({'width' : bothelementformerwidthpercent-element1newwidth + '%'});
				$('#'+element2).css({'left' : element1newwidth + element1newleft + '%'});
				sizemarkerelement2 = 0;
				sizemarkerelement1 = 0;
				
			}
			
			
			if (sizemarkerdir == 'vertical') {
				$( "#sizemarker" ).draggable({ axis: "y" });
				var border = $('#'+element1).offset().top + $('#'+element1).outerHeight();
				var bothelementformerheightpercent = parseFloat($('#'+element1)[0].style.height) + parseFloat($('#'+element2)[0].style.height); 
				var newheightpx = markertop - $('#'+element1).offset().top; // aktueller wert durch sizedivider
				var difffactor = (newheightpx / $('#'+element1).outerHeight());
				var element1newheight = difffactor*parseFloat($('#'+element1)[0].style.height);
				element1newheight = Math.round(element1newheight*10) /10;
				var element1newtop  = parseFloat($('#'+element1)[0].style.top);
				$('#'+element1).css({'height' : element1newheight + '%'});
				$('#'+element2).css({'height' : bothelementformerheightpercent-element1newheight + '%'});
				$('#'+element2).css({'top' : element1newheight + element1newtop + '%'});
				sizemarkerelement2 = 0;
				sizemarkerelement1 = 0;
				
			}
		}
		
		updateHTML();
	
	}
	
	
	function getsurroundingareas(gridelementid) {
		$('.gridelement').each( function() {
			
			
			
		})	
	}
	
	function getverticalsnappoint(thiselement) {
		
		var thistop    = parseFloat(thiselement[0].style.top);
		var thisbottom = parseFloat(thiselement[0].style.top) + parseFloat(thiselement[0].style.height);
		var thisleft   = parseFloat(thiselement[0].style.left);
		var thisright  = parseFloat(thiselement[0].style.left)+parseFloat(thiselement[0].style.width);
		
		var verticalsnappoint = [];
		
		$('.gridelement').each( function() {
			var testedelement = $(this);
			var testedtop	 = parseFloat(testedelement[0].style.top);
			var testedbottom = parseFloat(testedelement[0].style.top) + parseFloat(testedelement[0].style.height);
			var testedleft 	 = parseFloat(testedelement[0].style.left);
			var testedright  = parseFloat(testedelement[0].style.left) + parseFloat(testedelement[0].style.width);

			// links
			if ((thisright==testedleft) || (thisleft==testedright)) {
				if ($.inArray(testedtop, verticalsnappoint)==-1) {
					verticalsnappoint.push(testedtop);
				} 
				if ($.inArray(testedbottom, verticalsnappoint)==-1) {
					verticalsnappoint.push(testedbottom);
				}
			}
			
		})			
		
		console.log("vertical snappoint: " + verticalsnappoint);
		return verticalsnappoint;
		
	}
