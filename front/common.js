;( function ( $ ) {
	const buttons = $( '.wp-block-button' );
	if ( buttons.length > 0 ) {
		buttons.each( function ( i, e ) {
			$( this ).removeAttr( 'btnsub' );
		} );
	}
} )( jQuery )
