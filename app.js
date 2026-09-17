import { BlackbirdComponent } from './component.js';

class SimpleStore {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = {};
  }
  subscribe(key, callback) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
    callback(this.state[key]);
  }
  set(key, value) {
    this.state[key] = value;
    if (this.listeners[key]) this.listeners[key].forEach(cb => cb(value));
  }
}

class BlackbirdDocsLanding extends BlackbirdComponent {
  static templateString = `
    <style>
      :host { display: block; font-family: system-ui, -apple-system, sans-serif; color: #111; max-width: 1200px; margin: 0 auto; padding: 40px 20px; line-height: 1.5; }
      header { text-align: center; margin-bottom: 50px; }
      h1 { font-size: 3rem; margin-bottom: 10px; letter-spacing: -1px; display: flex; align-items: center; justify-content: center; gap: 15px; }
      .badge { background: #111; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: 500; align-self: center; }
      .tagline { font-size: 1.25rem; color: #666; margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto; }

      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-top: 40px; }
      .card { border: 1px solid #e1e1e1; padding: 25px; border-radius: 12px; background: #fff; display: flex; flex-direction: column; }
      .card h3 { margin-top: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 10px; }

      .btn { display: inline-block; background: #ff8d00; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; margin-top: 20px; cursor: pointer; border: none; }
      .btn:hover { background: #dd7a00; }
      .btn-secondary { background: #111; color: white; margin-left: 10px; }
      .btn-secondary:hover { background: #333; }

      .interactive-section { margin-top: 50px; border-top: 1px solid #eee; padding-top: 40px; text-align: center; margin-bottom: 60px; }
      .counter-display { font-size: 2rem; font-weight: bold; margin: 15px 0; color: #ff8d00; }

      /* Setup Guide Container Panels */
      .docs-container { max-width: 800px; margin: 0 auto; text-align: left; }
      .setup-section { background: #fafafa; border: 1px solid #e1e1e1; padding: 25px; border-radius: 12px; margin-bottom: 30px; }
      .setup-section h2 { margin-top: 0; font-size: 1.5rem; color: #111; }

      /* Code Blocks */
      pre { background: #111; color: #f4f4f4; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 0.9rem; overflow-x: auto; text-align: left; }
      code { font-family: monospace; }

      footer { border-top: 1px solid #eee; padding: 30px 0; text-align: center; color: #666; font-size: 0.9rem; }
      footer a { color: #ff8d00; text-decoration: none; font-weight: 500; }
      footer a:hover { text-decoration: underline; }
      .footer-meta { margin-top: 8px; font-size: 0.8rem; color: #999; }

      @media (max-width: 992px) {
        .grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 600px) {
        .grid { grid-template-columns: 1fr; }
        h1 { font-size: 2.2rem; }
      }
    </style>

    <!-- 1. ACTIVE CONDITION ROUTE A: THE PRIMARY LANDING DASHBOARD -->
    <div id="landing-view">
      <header>
        <h1>
          BlackbirdJS
          <span class="badge" data-bind="version">Loading...</span>
        </h1>
        <p class="tagline">The High-Performance, Fine-Grained, Local-First Frontend Engine built on native browser standards.</p>
        <button class="btn" data-on:click="goToGettingStarted">Get Started</button>
      </header>

      <main>
        <div class="grid">
          <div class="card">
            <h3>High Performance &amp; Speed</h3>
            <p>Blazing fast render velocities. Eliminates Virtual DOM recalculation algorithms to interact directly with target tree operations.</p>
          </div>
          <div class="card">
            <h3>Fine-Grained Reactivity</h3>
            <p>Pinpoint updates. Mutates specific text elements and layout paths directly without running heavy structural reconciliation sweeps.</p>
          </div>
          <div class="card">
            <h3>Extreme Modularity</h3>
            <p>Decoupled package design. Import core logic paths independently, ensuring production code bundles remain exceptionally small.</p>
          </div>
          <div class="card">
            <h3>Local-First Architecture</h3>
            <p>Offline-ready out of the box. Leverages companion modules like <strong>@blackbirdjs/cache</strong> for async IndexedDB workflows with custom TTL control.</p>
          </div>
          <div class="card">
            <h3>Template Based Rendering</h3>
            <p>Declarative component definition blocks. Bind reactive variables and native click listeners straight onto clear HTML markup schemas.</p>
          </div>
          <div class="card">
            <h3>Web Standards Native</h3>
            <p>Zero proprietary lock-in. Powered natively by Custom Elements and Shadow DOM specs to ensure universal compatibility across all browser runtimes.</p>
          </div>
        </div>

        <div class="interactive-section">
          <h3>Test Runtime Compilation Speed</h3>
          <p>This counter component is parsed and managed natively by your Blackbird proxy engine loop.</p>
          <div class="counter-display">Clicks: <span data-bind="clickCount">0</span></div>
          <button class="btn" style="background:#111;" data-on:click="incrementCount">Click Me</button>
        </div>
      </main>
    </div>

    <!-- 2. ACTIVE CONDITION ROUTE B: THE GETTING STARTED DOCS VIEW -->
    <div id="getting-started-view" style="display: none;">
      <header>
        <h1>Getting Started with BlackbirdJS</h1>
        <p class="tagline">Follow these integration pathways to integrate the zero-build reactive runtime into your stack.</p>
        <button class="btn btn-secondary" data-on:click="goToLanding">← Back to Overview</button>
      </header>

      <main class="docs-container">
        <!-- APPROACH ONE: CDN SETUP -->
        <section class="setup-section">
          <h2>Approach 1: Zero-Build Browser CDN Integration</h2>
          <p>Ideal for rapid prototyping, single-file applications, and lightweight dashboards. Load modules directly into any browser window via modern ES-module content networks with absolutely zero configuration dependencies.</p>
          <pre><code>&lt;script type="module"&gt;
  import { BlackbirdComponent } from 'https://esm.sh';

  class CustomComponent extends BlackbirdComponent {
    constructor() {
      super();
      this.state.message = "Hello World";
    }
  }
  customElements.define('custom-component', CustomComponent);
&lt;/script&gt;</code></pre>
        </section>

        <!-- APPROACH TWO: NPM SETUP -->
        <section class="setup-section">
          <h2>Approach 2: Production Package Management via NPM</h2>
          <p>Ideal for large-scale enterprise layouts, modular single-page apps, and configurations paired with offline tools like Vite or Rollup.</p>
          <p>Run the installation command inside your project directory repository node:</p>
          <pre><code>npm install @blackbirdjs/component</code></pre>
          <p>Consume the dependency package module natively inside your script files:</p>
          <pre><code>import { BlackbirdComponent } from '@blackbirdjs/component';

class MyComponent extends BlackbirdComponent {
  // Enforce zero-build multi-strategy path loaders
  static templatePath = './components/my-component.template.html';
}
customElements.define('my-component', MyComponent);</code></pre>
        </section>
      </main>
    </div>

    <footer>
      <p>&copy; <span data-bind="currentYear">2026</span> BlackbirdJS. Open source infrastructure.</p>
      <p>Maintained via <a href="https://github.com" target="_blank">GitHub</a> • Released under the Apache-2.0 License</p>
      <div class="footer-meta">Built natively using Blackbird web components.</div>
    </footer>
  `;

  constructor() {
    super();
    this.registerLocalStore(new SimpleStore({
      version: 'v0.1.0',
      clickCount: 0,
      currentYear: 2026
    }));
  }

    // Surgical state transitions that update element view states layout paths
  goToGettingStarted() {
    // Modify URL hash path natively for clean local-first browser history state updates
    window.history.pushState(null, '', '/getting-started');
    this.shadowRoot.getElementById('landing-view').style.display = 'none';
    this.shadowRoot.getElementById('getting-started-view').style.display = 'block';
  }

  goToLanding() {
    window.history.pushState(null, '', '/');
    this.shadowRoot.getElementById('getting-started-view').style.display = 'none';
    this.shadowRoot.getElementById('landing-view').style.display = 'block';
  }

  async connectedCallback() {
    await super.connectedCallback();
    this.compile();
  }

  incrementCount() {
    const current = this.localStore.state.clickCount;
    this.localStore.set('clickCount', current + 1);
  }

  alertInstall() {
    alert('Run this command in your project terminal:\nnpm install blackbirdjs');
  }
}

customElements.define('blackbird-docs-landing', BlackbirdDocsLanding);
