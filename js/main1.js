/* -------------------------------------
		CUSTOM FUNCTION WRITE HERE
-------------------------------------- */
jQuery(document).on('ready', function() {
	"use strict";
	/* -------------------------------------
			SHOW CURRENT DATE
	-------------------------------------- */
	jQuery("#tg-date").datepicker({dateFormat:"DD, M dd, yy"}).datepicker("setDate",new Date());
	/* ---------------------------------------
			FULL PAGE SEARCH
	--------------------------------------- */
	jQuery('a[href="#tg-search"]').on('click', function(event) {
		event.preventDefault();
		jQuery('#tg-search').addClass('open');
		jQuery('#tg-search > form > fieldset > input[type="search"]').focus();
	});
	jQuery('#tg-search, #tg-search button.close').on('click keyup', function(event) {
		if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
			jQuery(this).removeClass('open');
		}
	});
	jQuery('form').submit(function(event) {
		event.preventDefault();
		return false;
	});
	jQuery('.tg-search button.close').on('click', function(){
		jQuery(this).parents('.tg-search').removeClass('open');
	});
	/* -------------------------------------
			COLLAPSE MENU SMALL DEVICES
	-------------------------------------- */
	function collapseMenu(){
		jQuery('.menu-item-has-children').prepend('<span class="tg-dropdowarrow"><i class="lnr lnr-chevron-right"></i></span>');
		jQuery('.menu-item-has-children span').on('click', function() {
			jQuery(this).next().next().slideToggle(300);
			jQuery(this).parent('.menu-item-has-children').toggleClass('tg-open');
		});
	}
	collapseMenu();
	/* ---------------------------------------
			SHOW HIDE PASSWORD
	--------------------------------------- */
	jQuery(".tg-btnshowpassword").on('click', function() {
		if (jQuery(".tg-password").attr("type") == "password") {
			jQuery(".tg-password").attr("type", "text");
		} else {
			jQuery(".tg-password").attr("type", "password");
		}
	});
	/* ---------------------------------------
			MEGA MENU TABS SLIDER
	--------------------------------------- */
	var owl = jQuery(".tg-tabsslider");
	owl.owlCarousel({
		itemsCustom : [
				[0, 2],
				[320, 1],
				[639, 2],
				[992, 3],
				[1200, 4],
				[1360, 4],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
	});
	/* ---------------------------------------
			HOME BANNER SLIDER
	--------------------------------------- */
	var owl = jQuery("#tg-homeslider");
	owl.owlCarousel({
		itemsCustom : [
				[0, 2],
				[320, 1],
				[639, 2],
				[992, 3],
				[1200, 3],
				[1360, 4],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
	});
	
	/* ---------------------------------------
			HOME BANNER SLIDER
	--------------------------------------- */
	var owl = jQuery("#tg-newproductslider");
	owl.owlCarousel({
		singleItem: true,
		navigation : false,
		pagination: true,
	});
	/* ---------------------------------------
			FEATURED POST SLIDER
	--------------------------------------- */
	var owl = jQuery('#tg-featuredpostslider');
	var status = jQuery('.tg-slidecount');
	owl.owlCarousel({
		itemsCustom : [
			[320, 1],
			[568, 2],
			[768, 3],
			[992, 4],
			[1200, 4],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
		afterAction : afterAction,
	});
	function updateResult(pos,value){
		status.find(pos).find(".tg-result").text(value);
	}
	function afterAction(){
		updateResult(".tg-owlItems", this.owl.owlItems.length);
		updateResult(".tg-currentItem", this.owl.currentItem + 1);
	}
	/* ---------------------------------------
			FEATURED POST SLIDER
	--------------------------------------- */
	var owl = jQuery('#tg-featuredpostslider2');
	var status = jQuery('.tg-slidecount');
	owl.owlCarousel({
		itemsCustom : [
			[1200, 3],
			[992, 3],
			[768, 2],
			[480, 2],
			[439, 2],
			[320, 1],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
		afterAction : afterAction,
	});
	function updateResult(pos,value){
		status.find(pos).find(".tg-result").text(value);
	}
	function afterAction(){
		updateResult(".tg-owlItems", this.owl.owlItems.length);
		updateResult(".tg-currentItem", this.owl.currentItem + 1);
	}
	/* ---------------------------------------
			FEATURED POST SLIDER
	--------------------------------------- */
	var owl = jQuery('#tg-featuredpostslider3');
	var status = jQuery('.tg-slidecount');
	owl.owlCarousel({
		itemsCustom : [
			[1200, 4],
			[992, 3],
			[768, 2],
			[480, 2],
			[439, 2],
			[320, 1],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
		afterAction : afterAction,
	});
	function updateResult(pos,value){
		status.find(pos).find(".tg-result").text(value);
	}
	function afterAction(){
		updateResult(".tg-owlItems", this.owl.owlItems.length);
		updateResult(".tg-currentItem", this.owl.currentItem + 1);
	}
	/* ---------------------------------------
			HOME BANNER SLIDER
	--------------------------------------- */
	var owl = jQuery("#tg-widgetpostslider");
	owl.owlCarousel({
		singleItem:true,
		navigation : false,
		pagination: true,
	});
	/* ---------------------------------------
			TICKER SLIDER
	--------------------------------------- */
	var owl = jQuery("#tg-ticker");
	owl.owlCarousel({
		singleItem:true,
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnsquareprev"><i class="fa fa-angle-left"></i></span>',
			'<span class="tg-btnsquarenext"><i class="fa fa-angle-right"></i></span>'
		],
	});
	/* -------------------------------------
			PRETTY PHOTO GALLERY
	-------------------------------------- */
	jQuery("a[data-rel]").each(function () {
		jQuery(this).attr("rel", jQuery(this).data("rel"));
	});
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'normal',
		theme: 'dark_square',
		slideshow: 3000,
		autoplay_slideshow: false,
		social_tools: false
	});
	/* ---------------------------------------
			FEATURED POST SLIDER
	--------------------------------------- */
	var owl = jQuery('#tg-bannerfullslider');
	var status = jQuery('.tg-bannerslidecount');
	owl.owlCarousel({
		singleItem: true,
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
		afterAction : afterAction,
	});
	function updateResult(pos,value){
		status.find(pos).find(".tg-result").text(value);
	}
	function afterAction(){
		updateResult(".tg-owlItems", this.owl.owlItems.length);
		updateResult(".tg-currentItem", this.owl.currentItem + 1);
	}
	/* ---------------------------------------
			VERSION FOUR BANNER SLIDER
	--------------------------------------- */
	function slickSlider(){
		var _status = jQuery('.tg-bannerfullwidthslidecount');
		var _slider = jQuery('#tg-bannerfullwidthslider');
		_slider.on('init reInit afterChange', function (event, slick, currentSlide) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			_status.text(i + '/' + slick.slideCount);
		});
		_slider.slick({
			prevArrow: '.tg-btnslicksquareprev',
			nextArrow: '.tg-btnslicksquarenext',
		});
	}
	slickSlider();
	/* ---------------------------------------
			GALLERY SLIDER
	--------------------------------------- */
	var sync1 = $("#tg-galleryslider");
	var sync2 = $("#tg-gallerysliderthumb");
		sync1.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		navigation: true,
		pagination:false,
		afterAction : syncPosition,
		responsiveRefreshRate : 200,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
	});
	sync2.owlCarousel({
		items : 7,
		itemsDesktop      : [1199,5],
		itemsDesktopSmall     : [992,3],
		itemsTablet       : [568,2],
		itemsMobile       : [479,2],
		pagination:false,
		responsiveRefreshRate : 100,
		afterInit : function(el){
		el.find(".owl-item").eq(0).addClass("synced");
		}
	});
	function syncPosition(el){
	var current = this.currentItem;
	$("#tg-gallerysliderthumb")
		.find(".owl-item")
		.removeClass("synced")
		.eq(current)
		.addClass("synced")
	if($("#tg-gallerysliderthumb").data("owlCarousel") !== undefined){
		center(current)
		}
	}
	$("#tg-gallerysliderthumb").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
	});
	function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
		if(num === sync2visible[i]){
		var found = true;
		}
	}
	if(found===false){
	if(num>sync2visible[sync2visible.length-1]){
		sync2.trigger("owl.goTo", num - sync2visible.length+2)
	}else{
		if(num - 1 === -1){
		num = 0;
	}
	sync2.trigger("owl.goTo", num);
	}
	} else if(num === sync2visible[sync2visible.length-1]){
	sync2.trigger("owl.goTo", sync2visible[1])
	} else if(num === sync2visible[0]){
	sync2.trigger("owl.goTo", num-1)
	}
	}
	/* -------------------------------------
			Google Map
	-------------------------------------- */
	jQuery("#tg-location-map").gmap3({
		marker: {
			address: "1600 Elizabeth St, Melbourne, Victoria, Australia",
			options: {
				title: "Robert Frost Elementary School",
				icon: "images/map-marker.png",
			}
		},
		map: {
			options: {
				zoom: 16,
				scrollwheel: false,
				disableDoubleClickZoom: true,
			}
		}
	});
	/* -------------------------------------
			PRODUCT DETAIL SLIDER
	-------------------------------------- */
	function productDetailslider(){
		var sync1 = $("#tg-productdetailslider");
		var sync2 = $("#tg-productdetailthumbs");
		sync1.owlCarousel({
			singleItem : true,
			slideSpeed : 1000,
			pagination:false,
			navigation : false,
			afterAction : syncPosition,
			responsiveRefreshRate : 200,
		});
		sync2.owlCarousel({
			items					: 4,
			itemsDesktop			: [1199,3],
			itemsDesktopSmall		: [991,3],
			itemsTablet				: [767,3],
			itemsMobile				: [479,2],
			pagination:false,
			responsiveRefreshRate : 100,
			afterInit : function(el){
				el.find(".owl-item").eq(0).addClass("tg-active");
			}
		});
		function syncPosition(el){
			var current = this.currentItem;
			$("#tg-productdetailthumbs")
			.find(".owl-item")
			.removeClass("tg-active")
			.eq(current)
			.addClass("tg-active");
			if($("#tg-productdetailthumbs").data("owlCarousel") !== undefined){
				center(current);
			}
		}
		$("#tg-productdetailthumbs").on("click", ".owl-item", function(e){
			e.preventDefault();
			var number = $(this).data("owlItem");
			sync1.trigger("owl.goTo",number);
		});
		function center(number){
			var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
			var num = number;
			var found = false;
			for(var i in sync2visible){
				if(num === sync2visible[i]){
					var found = true;
				}
			}
			if(found===false){
				if(num>sync2visible[sync2visible.length-1]){
				sync2.trigger("owl.goTo", num - sync2visible.length+2);
				}else{
					if(num - 1 === -1){
						num = 0;
					}
					sync2.trigger("owl.goTo", num);
				}
			} else if(num === sync2visible[sync2visible.length-1]){
				sync2.trigger("owl.goTo", sync2visible[1]);
			} else if(num === sync2visible[0]){
				sync2.trigger("owl.goTo", num-1);
			}
		}
	}
	productDetailslider();
	/*------------------------------------------
			PRODUCT INCREASE
	------------------------------------------*/
	jQuery('em.minus').on('click', function () {
		jQuery('#quantity1').val(parseInt(jQuery('#quantity1').val(), 10) - 1);
	});
	jQuery('em.plus').on('click', function () {
		jQuery('#quantity1').val(parseInt(jQuery('#quantity1').val(), 10) + 1);
	});
	/* ---------------------------------------
			RELATED PRODUCTS SLIDER
	--------------------------------------- */
	var owl = jQuery('#tg-relatedproductslider');
	var status = jQuery('.tg-slidecount');
	owl.owlCarousel({
		itemsCustom : [
			[1200, 3],
			[992, 3],
			[768, 2],
			[640, 3],
			[480, 2],
			[320, 1],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
		afterAction : afterAction,
	});
	function updateResult(pos,value){
		status.find(pos).find(".tg-result").text(value);
	}
	function afterAction(){
		updateResult(".tg-owlItems", this.owl.owlItems.length);
		updateResult(".tg-currentItem", this.owl.currentItem + 1);
	}
	/* ---------------------------------------
			RELATED PRODUCTS SLIDER
	--------------------------------------- */
	var owl = jQuery('#tg-relatedproductsliderv2');
	var status = jQuery('.tg-slidecount');
	owl.owlCarousel({
		itemsCustom : [
			[1200, 4],
			[992, 4],
			[768, 3],
			[640, 3],
			[480, 2],
			[320, 1],
		],
		pagination: false,
		navigation : true,
		navigationText: [
			'<span class="tg-btnarrowprev"><i class="lnr lnr-arrow-left"></i></span>',
			'<span class="tg-btnarrownext"><i class="lnr lnr-arrow-right"></i></span>'
		],
		afterAction : afterAction,
	});
	function updateResult(pos,value){
		status.find(pos).find(".tg-result").text(value);
	}
	function afterAction(){
		updateResult(".tg-owlItems", this.owl.owlItems.length);
		updateResult(".tg-currentItem", this.owl.currentItem + 1);
	}
	/* -------------------------------------
			COMMINGSOON COUNTDOWN
	-------------------------------------- */
	var clock;
		var currentDate = new Date();
		var pastDate  = new Date(currentDate.getFullYear(), 0, 1);
		var diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;
		clock = jQuery('.clock').FlipClock(diff, {
			clockFace: 'DailyCounter'
	});
	/* -------------------------------------
			PROGRESS BAR
	-------------------------------------- */
	try {
		$('#tg-ourskill').appear(function () {
			jQuery('.tg-skillholder').each(function () {
				jQuery(this).find('.tg-skillbar').animate({
					width: jQuery(this).attr('data-percent')
				}, 2500);
			});
		});
	} catch (err) {}
});