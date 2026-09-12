const DIRECTIVES = {
  bind: 'data-bind',
  eventPrefix: 'data-on:'
};

export function parseInitialAttributes(component) {
  if (!component.localStore) return;
  Array.from(component.attributes).forEach(attr => {
    if (attr.name.startsWith('data-')) {
      const cleanKey = attr.name
        .replace(/^data-/, '')
        .replace(/-([a-z])/g, g => g.toUpperCase());
      component.localStore.set(cleanKey, attr.value);
    }
  });
}

export function compileDOM(component, globalStoreInstance) {
  if (!component.shadowRoot) return;

  const boundElements = component.shadowRoot.querySelectorAll(`[${DIRECTIVES.bind}]`);
  boundElements.forEach(element => {
    const bindingExpression = element.getAttribute(DIRECTIVES.bind).trim();
    if (component.localStore && typeof component.localStore.subscribe === 'function') {
      component.localStore.subscribe(bindingExpression, (val) => {
        element.textContent = val !== undefined ? val : '';
      });
    }
  });

  const allElements = component.shadowRoot.querySelectorAll('*');
  allElements.forEach(element => {
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith(DIRECTIVES.eventPrefix)) {
        const eventType = attr.name.slice(DIRECTIVES.eventPrefix.length);
        const methodName = attr.value.trim();
        element.addEventListener(eventType, (e) => {
          if (typeof component[methodName] === 'function') {
            component[methodName](e);
          }
        });
      }
    });
  });
}
