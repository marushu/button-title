<?php
/**
 * Register and Enqueue Scripts.
 */
function button_title_register_scripts() {

	wp_enqueue_script(
		'button-title-js',
		plugins_url( 'common.js', __FILE__ ),
		array( 'jquery' ),
		'',
		true
	);
	wp_script_add_data( 'button-title-js', 'async', true );

}
add_action( 'wp_enqueue_scripts', 'button_title_register_scripts' );
