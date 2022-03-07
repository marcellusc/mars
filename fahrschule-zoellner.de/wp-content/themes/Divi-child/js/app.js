jQuery(document).ready(function($) {


	/* =========================================================*
     *    MENU WITH COLLAPSIBLE SUBMENUS 					    *
     * =========================================================*/
	
	function setup_collapsible_submenus(menu_container) {
		
						
			// build in a toggle-element if not there yet
			if( ! menu_container.find(".menu-item-has-children > a").siblings(".sub-menu-toggle").length){
				menu_container.find(".menu-item-has-children > a" ).after("<div class='sub-menu-toggle'></div>");
			}
		
			// show/hide submenus on click/touch on toggle-element
			menu_container.on("click touchstart", ".menu-item-has-children .sub-menu-toggle", function (e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				$(this).toggleClass("popped");
			});
			
	}
	
	// setup on menu on pageload
	if($(window).width() < 1400){
		setup_collapsible_submenus($("#main-header"));
	}
	setup_collapsible_submenus($("#footer-main-menu"));
	
	// re-setup menu on screen rotation/resize
	$(window).on("orientationchange resize", function(){
		if($(window).width() < 1400){
			setup_collapsible_submenus($("#main-header"));
		}
		setup_collapsible_submenus($("#footer-main-menu"));
	});

	
	/* ===== END MENU WITH COLLAPSIBLE SUBMENUS  ===============*/
	
		
	/* =========================================================*
     *    TIMETABLES THEORIEUNTERRICHT						    *
     * =========================================================*/
	
	if($(".timetable-wrap").length){
		
		var pxPerHour = 50; /* How many pixels of height per hour? */
		
		// Start, End & Duration of Days
		var timeStart = timeToDecimal($(".timetable-wrap").attr("timestart"));
		var timeEnd = timeToDecimal($(".timetable-wrap").attr("timeend"));
		var durationDay = timeEnd - timeStart;
		$(".timetable-wrap").css({
			"min-height": function(){
				return (durationDay + 1)*pxPerHour + "px";			
			}
		});

		// Start, End & Duration of each Lesson 
		$(".lesson-wrap").each(function(){
			// console.log("Lesson: " + $(this).text());	
			var lessonStart = timeToDecimal($(this).attr("timestart"));
			var lessonEnd = timeToDecimal($(this).attr("timeend"));
			var lessonOffset = lessonStart - timeStart;
			var lessonDuration = lessonEnd - lessonStart;
			
			// console.log("Offset: "+lessonOffset+ " Duration: "+lessonDuration);
			
			  $( this ).css({
				"top": function() {
				  return (lessonOffset*pxPerHour + 40 - 1 ) + "px"; //50 pro Stunde + 40px für die Wochentagsnamen - 1px um Border auszugleichen
				},
				"height": function() {
				  return (lessonDuration*pxPerHour + 2) + "px"; //50 pro Stunde + 2px für Border
				}
			  });
			
		});
	}
	
	/**
	 * Turn time (format hh:mm) into decimal.
	 * @param t String time (hh:mm) 
	 * @return Float
	 */
	function timeToDecimal(t) {
		var arr = t.split(':');
		var dec = parseInt((arr[1]/6)*10, 10);
   	 	return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
	}   
	
	/* ====== END TIMETABLES THEORIEUNTERRICHT	================*/

});