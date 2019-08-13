'use strict';

window.customElements.define('th-toggle',
  class ThToggle extends HTMLElement{
    constructor(){
      super();
      this.widthBreakpoint = 800;
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
        @media screen and (min-width: ${this.widthBreakpoint}px){
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
      contentBlock.innerHTML = `
        <summary>
          <h2><slot name="summary"></slot></h2>
        </summary>
        <slot></slot>
      `;
      if(window.innerWidth >= this.widthBreakpoint){
        contentBlock.setAttribute('open', '');
      }
      return contentBlock;
    }

    detailsToggleListener(event){
      if(window.innerWidth >= this.widthBreakpoint){
        // disable collapse on desktop
        let d = this.shadowRoot.querySelector('details');
        d.open = true; 
      }
    }  
  });
