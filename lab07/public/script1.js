$( document ).ready(function() {
    $( "a" ).addClass( "test" );

    $( "a" ).click(function( event ) {
        //event.preventDefault();
        var newElement = document.createElement( "p" );

        $.ajax({
          url: "/fetch",
          type: "GET",
          data: {
            username: "lab07"
          },
          dataType : "json",
        })
          .done(function( json ) {
            $( newElement ).text( json.username );
          })

//        $(newElement).text("no data yet...");
        $(this).after(newElement);

        //$( this ).hide( "slow" );

    });
});

$( function() {
  $( ".widget input[type=submit], .widget a, .widget button" ).button();
  $( "button, input, a" ).click( function( event ) {
    event.preventDefault();
  } );
} );
