'use strict';

window.customElements.define('th-toggle',
  class ThToggle extends HTMLElement{
    constructor(){
      super();
    }

    connectedCallback(){
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(this.styleBlock);
      this.shadowRoot.appendChild(this.contentBlock);

      //add event listeners
      let details = this.shadowRoot.querySelector('details');
      details.addEventListener('toggle', (event) => this.detailsToggleListener(event) );
      window.addEventListener('resize', (event) => this.detailsToggleListener(event) );
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

    detailsToggleListener(event){
      if(window.innerWidth > 800){
        let d = event.srcElement;
        if(d.open !== true){
          d.open = true; 
        }
      }
    }  
  });
