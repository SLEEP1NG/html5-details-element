'use strict';
// For more on custom elements, see
// https://developers.google.com/web/fundamentals/web-components/shadowdom

window.customElements.define('th-toggle',
  class ThToggle extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(this.styleBlock);
      shadowRoot.appendChild(this.contentBlock);
    }

    get styleBlock(){
      let styleBlock = document.createElement('style');
      styleBlock.innerHTML = `
        summary h2{
          display: inline-block;
        }
      `;
      return styleBlock;
    }

    get contentBlock(){
      let contentBlock = document.createElement('details');
      contentBlock.setAttribute('open', '');
      contentBlock.innerHTML = `
        <summary>
          <h2><slot name="summary"></slot></h2>
        </summary>
        <slot></slot>
      `;
      return contentBlock;
    }
  });
