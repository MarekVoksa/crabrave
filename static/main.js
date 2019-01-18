function getQueryParams( qs ) {

    qs = qs.split( '+' ).join( ' ' );

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while ( tokens = re.exec( qs ) ) {

        params[decodeURIComponent( tokens[1] )] = decodeURIComponent( tokens[2] );

    }

    return params;

}

function updateURL( text ) {

  if ( history.pushState ) {

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?text=' + encodeURIComponent( text );

    window.history.pushState( { path: newurl }, '', newurl );

  }

}

function load() {

  var text = getQueryParams( document.location.search ).text;

  var $video = $( '#video' ),
    $text = $( '.text-container' ),
    $newMeme = $( '#new-meme' );

  if ( text ) {

    $newMeme.css( "display", "none" );

    $text.html( text.toUpperCase() );

    $video.trigger( "play" );

    $video.get( 0 ).volume = 1;

    $text.on( "click", function () {

      $video.get( 0 ).paused ? $video.trigger( "play" ) : $video.trigger( "pause" );

    });

  } else {

    $newMeme.css( "display", "flex" );

    $video.prop( "volume", 0.1 );

    $text.on( "click", function () {

      $video.get( 0 ).paused ? $video.trigger( "play" ) : $video.trigger( "pause" );

    });

  }

}

function createMeme() {

  newText = document.getElementById( "text" ).value;

  updateURL( newText );

  load();

}

load();
