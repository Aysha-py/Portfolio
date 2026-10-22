// The small base class the page logic in components/logic/ is written against.
// It mirrors the design canvas: `this.props`, `this.state` and `this.setState()`.
export class DCLogic {
  constructor() {
    this.props = {};
    this.state = {};
    this._notify = null;
  }

  setState(patch) {
    const next = typeof patch === "function" ? patch(this.state || {}) : patch;
    this.state = { ...(this.state || {}), ...(next || {}) };
    if (this._notify) this._notify();
  }
}
