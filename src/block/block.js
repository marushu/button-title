/**
 * BLOCK: button-tite
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { assign } = lodash;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { TextControl, PanelBody, ToggleControl } = wp.components;
const { createHigherOrderComponent, withState } = wp.compose;
const { InspectorControls } = wp.editor;
const setClassArr = [];

// eslint-disable-next-line valid-jsdoc
/**
 * Is the passed block name one which supports our custom field?
 *
 * @param {string} name The name of the block.
 */
function isValidBlockType( name ) {
	const validBlockTypes = [
		'core/button',
	];

	return validBlockTypes.includes( name );
}// end isValidBlockType()

/**
 * Override the default edit UI to include a new block inspector control for
 * adding our custom control.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export const addMyCustomBlockControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( isValidBlockType( props.name ) && props.isSelected ) {
			function onChangeEmphasis( newValue ) {
				const emphasisClass = newValue === true
					? 'emphasis'
					: '';
				if ( setClassArr.indexOf( emphasisClass ) === -1 && newValue === true ) {
					setClassArr.push( emphasisClass );
				}

				if ( emphasisClass === '' ) {
					let emphasisIndex = setClassArr.indexOf( 'emphasis' );
					if ( emphasisIndex !== -1 ) {
						setClassArr.splice( emphasisIndex, 1 );
					}
				}

				setClasses( setClassArr );

			}
			function onChangeBtnsub() {
				props.attributes.text = props.attributes.text.replace( /<p(?: .+?)?>.*?<\/p>/g, '' );
				if ( props.attributes.tmptext !== undefined ) {
					props.attributes.text = '<p class="micro-copy">'
						+ props.attributes.tmptext
						+ '</p>' + props.attributes.text;
				}
				if ( props.attributes.tmptext === '' ) {
					props.attributes.text = props.attributes.text.replace( /<p(?: .+?)?>.*?<\/p>/g, '' );
				}
				const hasCopyClass = props.attributes.tmptext !== ''
					? 'has-copy'
					: '';
				if ( setClassArr.indexOf( hasCopyClass ) === -1 && hasCopyClass !== '' ) {
					setClassArr.push( hasCopyClass );
				}


				if ( props.attributes.tmptext === '' && hasCopyClass === '' ) {
					let hasCopyIndex = setClassArr.indexOf( 'has-copy' );
					if ( hasCopyIndex !== -1 ) {
						setClassArr.splice( hasCopyIndex, 1 );
					}
				}

				setClasses( setClassArr );

			}

			function setClasses( arr ) {

				let arrToStr = arrayUnique( arr ).join( ' ' );
				props.attributes.className = '';
				props.attributes.className = 'wp-block-button' + ' ' + arrToStr;
				props.setAttributes( {
					btnsub: props.attributes.tmptext,
					text: props.attributes.text,
					className: props.attributes.className,
				} );

			}

			function arrayUnique( array ) {
				return array.filter( function( value, index ) {
					return index === array.indexOf( value ) ;
				} ) ;
			}

			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody  title={ 'オプション' }>
							<ToggleControl
								label="ボタン強調"
								value={ props.attributes.toggle }
								help={ props.attributes.toggle ? '強調' : '通常' }
								checked={ props.attributes.toggle }
								// onChange={ ( newValue ) => {
								// 	props.setAttributes( {
								// 		toggle: newValue
								// 	} );
								// } }
								// onChange={ ( newValue ) => {
								// 	onChangeBtnsub
								// 	props.setAttributes( {
								// 		toggle: newValue
								// 	} );
								// } }
								onChange={ ( newValue ) =>{
									onChangeEmphasis( newValue )
									props.setAttributes( {
										toggle: newValue
									} );
								} }
							/>
							<TextControl
								label={ __( 'コピーテキスト' ) }
								help={ __( 'ボタンの上にテキストを表示します。Setで確定。' ) }
								className="micro-copy"
								tagName="span"
								value={ props.attributes.tmptext }
								placeholder="ボタンのコピーを入力…"
								onChange={ ( newValue ) => {
									props.setAttributes( {
										tmptext: newValue,
									} );
								} }
							/>
							<button onClick={onChangeBtnsub}>Set</button>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		}
		return <BlockEdit { ...props } />;
	};
}, 'addMyCustomBlockControls' );
addFilter( 'editor.BlockEdit', 'my-plugin/my-control', addMyCustomBlockControls );

/**
 * Filters registered block settings, extending attributes with our custom data.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute( settings ) {
	// If this is a valid block
	if ( isValidBlockType( settings.name ) ) {
		// Use Lodash's assign to gracefully handle if attributes are undefined
		settings.attributes = assign( settings.attributes, {
			btnsub: {
				type: 'string',
				source: settings.attributes.btnsub,
			},
			tmptext: {
				type: 'string',
			},
			toggle: {
				type: 'boolean',
				//toggleの初期値を設定
				default: false,
			},
		} );
	}
	return settings;
}// end addAttribute()
addFilter( 'blocks.registerBlockType', 'my-plugin/add-attr', addAttribute );

/**
 * Override props assigned to save component to inject our custom data.
 * This is only done if the component is a valid block type.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps( extraProps, blockType, attributes ) {
	// If the current block is valid, add our prop.
	if ( isValidBlockType( blockType.name ) ) {
		extraProps.btnsub = attributes.btnsub;
	}

	if ( blockType.name === 'core\/button' ) {
		//console.log( attributes.toggle )
	}

	return extraProps;

}// end addSaveProps()
addFilter( 'blocks.getSaveContent.extraProps', 'my-plugin/add-props', addSaveProps, 0 );
