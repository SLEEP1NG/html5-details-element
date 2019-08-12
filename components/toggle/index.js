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
      this.shadowRoot.appendChild(this.styleBlock);
      this.shadowRoot.appendChild(this.contentBlock);
      this.disableDetailsToggleOnDesktop(this.shadowRoot);
    }

    get styleBlock(){
      let styleBlock = document.createElement('style');
      styleBlock.innerHTML = `
        summary h2{
          display: inline-block;
        }

        /*******************************************
         * Conditionally hiding the twisty arrow 
         * for summary on desktop, leaving it
         * in place for mobile
         ******************************************/
        @media screen and (min-width: 800px){
          summary{
            list-style: none; //firefox
          }

          summary::-webkit-details-marker{
            display: none; //chrome, safari, opera
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


    disableDetailsToggleOnDesktop(sr){
      let details = sr.querySelector('details');
      console.dir(details);
      
      if(window.innerWidth > 800){
        details.addEventListener('toggle', (event) => this.detailsToggleListener(event));
      } else{
        details.removeEventListener('toggle', this.detailsToggleListener);
      }
    }

    detailsToggleListener(event){
      console.dir(event);
      let d = event.srcElement;
      if(d.open !== true){
        d.open = true; 
      }
    }  
  });
