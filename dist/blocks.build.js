!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1)},function(t,e,n){"use strict";function r(t){return["core/button"].includes(t)}function o(t){return r(t.name)&&(t.attributes=l(t.attributes,{btnsub:{type:"string",source:t.attributes.btnsub},tmptext:{type:"string"},toggle:{type:"boolean",default:!1}})),t}function a(t,e,n){return r(e.name)&&(t.btnsub=n.btnsub),e.name,t}var u=n(2),i=(n.n(u),n(3)),s=(n.n(i),lodash),l=s.assign,__=wp.i18n.__,c=wp.element.Fragment,p=wp.hooks.addFilter,m=wp.components,b=m.TextControl,f=m.PanelBody,d=m.ToggleControl,g=wp.compose,x=g.createHigherOrderComponent,y=(g.withState,wp.editor.InspectorControls),h=[];p("editor.BlockEdit","my-plugin/my-control",x(function(t){return function(e){if(r(e.name)&&e.isSelected){var n=function(t){var e=!0===t?"emphasis":"";if(-1===h.indexOf(e)&&!0===t&&h.push(e),""===e){var n=h.indexOf("emphasis");-1!==n&&h.splice(n,1)}a(h)},o=function(){e.attributes.text=e.attributes.text.replace(/<p(?: .+?)?>.*?<\/p>/g,""),void 0!==e.attributes.tmptext&&(e.attributes.text='<p class="micro-copy">'+e.attributes.tmptext+"</p>"+e.attributes.text),""===e.attributes.tmptext&&(e.attributes.text=e.attributes.text.replace(/<p(?: .+?)?>.*?<\/p>/g,""));var t=""!==e.attributes.tmptext?"has-copy":"";if(-1===h.indexOf(t)&&""!==t&&h.push(t),""===e.attributes.tmptext&&""===t){var n=h.indexOf("has-copy");-1!==n&&h.splice(n,1)}a(h)},a=function(t){var n=u(t).join(" ");e.attributes.className="",e.attributes.className="wp-block-button "+n,e.setAttributes({btnsub:e.attributes.tmptext,text:e.attributes.text,className:e.attributes.className})},u=function(t){return t.filter(function(e,n){return n===t.indexOf(e)})};return wp.element.createElement(c,null,wp.element.createElement(t,e),wp.element.createElement(y,null,wp.element.createElement(f,{title:"\u30aa\u30d7\u30b7\u30e7\u30f3"},wp.element.createElement(d,{label:"\u30dc\u30bf\u30f3\u5f37\u8abf",value:e.attributes.toggle,help:e.attributes.toggle?"\u5f37\u8abf":"\u901a\u5e38",checked:e.attributes.toggle,onChange:function(t){n(t),e.setAttributes({toggle:t})}}),wp.element.createElement(b,{label:__("\u30b3\u30d4\u30fc\u30c6\u30ad\u30b9\u30c8"),help:__("\u30dc\u30bf\u30f3\u306e\u4e0a\u306b\u30c6\u30ad\u30b9\u30c8\u3092\u8868\u793a\u3057\u307e\u3059\u3002Set\u3067\u78ba\u5b9a\u3002"),className:"micro-copy",tagName:"span",value:e.attributes.tmptext,placeholder:"\u30dc\u30bf\u30f3\u306e\u30b3\u30d4\u30fc\u3092\u5165\u529b\u2026",onChange:function(t){e.setAttributes({tmptext:t})}}),wp.element.createElement("button",{onClick:o},"Set"))))}return wp.element.createElement(t,e)}},"addMyCustomBlockControls")),p("blocks.registerBlockType","my-plugin/add-attr",o),p("blocks.getSaveContent.extraProps","my-plugin/add-props",a,0)},function(t,e){},function(t,e){}]);