//responsive
const nav = $(".nav");
const close = $("#close");
const open = $("#open");

open.click(function () { 
    nav.addClass("visible");
});
close.click(function (){
    nav.removeClass("visible");
});


//create-btn rotate

const plusIcon = $(".plus");
const createBtn = $(".create-btn");

createBtn.hover(function () {
        // over
        plusIcon.css({
            transform: "rotate(180deg)",
            transition: "500ms"
        });
    }, function () {
        // out
        plusIcon.css({
            transform: "rotate(0deg)",
            transition: "500ms"
        });
    }
);

//posting list
const gCont = $(".gender-cont");
const display =  $("#display");

display.click(function (e) {
    if(gCont.hasClass("visible") === true){
        gCont.removeClass("visible");
        gCont.slideUp();
        display.css({
            transform: "rotate(0deg)",
            transition: "500ms"
        });
    }
    else{
        gCont.addClass("visible");
        gCont.slideDown();
        display.css({
            transform: "rotate(180deg)",
            transition: "500ms"
        });
    }
});


//show file name

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});
}( document, window, 0 ));


//animate how-work

