import { parseInitialAttributes, compileDOM } from './compiler.js';

export class BlackbirdComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.localStore = null;
    this.isCompiled = false;
  }

  registerLocalStore(storeInstance) {
    this.localStore = storeInstance;
  }

  async connectedCallback() {
    if (this.constructor.templateString) {
      const template = document.createElement('template');
      template.innerHTML = this.constructor.templateString;
      const clone = template.content.cloneNode(true);
      this.shadowRoot.appendChild(clone);
    }
  }

  compile() {
    if (this.isCompiled) return;
    parseInitialAttributes(this);
    compileDOM(this, null);
    this.isCompiled = true;
  }
}
