<?php
/**
 * Plugin Name: Add Button to copy.
 * Description: This plugin add button's copy field to each default button block.
 * Author: Digitalcube
 * Author URI: https://www.digitalcube.jp/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Button Title
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Load JS for front.
 */
require_once plugin_dir_path( __FILE__ ) . 'front/enqueue.php';
