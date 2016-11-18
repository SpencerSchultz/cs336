$(document).ready(function(){
    $( 'form' ).submit(function( event ) {
        event.preventDefault();

        var newElement = document.createElement( "p" );

        var form = $(this);

        $.ajax({
          url: '/people',
          dataType: 'json',
          type: 'PUT',
          data: form.serialize(),
        })
          .done(function( json ){
            $.getJSON( '/fetchAll' )
              .done(function(data) {
                $( newElement ).text(JSON.stringify(data));
              });
          })
          .fail(function() {
            console.log("put failed, ID already in database");
            $.getJSON( '/fetchAll' )
              .done(function(data) {
                $( newElement ).text(JSON.stringify(data));
              });
          });


          $(this).after(newElement);
    });
});
