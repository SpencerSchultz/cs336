$(document).ready(function(){
    $("button").click(function(){
        var inputId = $("input:text").val();

        var newElement = document.createElement( "p" );

        $.getJSON( '/fetch', {
          personId: inputId
        })
          .done(function(data) {
            console.log(data);
            console.log(inputId);
            $( newElement ).text( data )
          });

          $(this).after(newElement);
/*
        $.ajax({
          url: "/fetch",
          type: "GET",
          data: inputId,
          dataType : "json",
        })
          .done(function( json ) {
//            var tempData = JSON.parse(json)
            console.log(json);
            console.log(inputId);
            $( newElement ).text( json.inputId );
          })

        //        $(newElement).text("no data yet...");
        $(this).after(newElement);

        //$( this ).hide( "slow" );
        */


    });
});
