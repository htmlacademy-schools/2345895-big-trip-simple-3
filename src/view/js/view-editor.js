import {ButtonDelete} from '../../enum/all-func';
import {ButtonSave} from '../../enum/all-func';

import {html} from './view.js';
import DisplayingManagingElementCreationForm from './displaying-managing-element-creation-form.js';

export default class ViewEditor extends DisplayingManagingElementCreationForm {
  constructor() {
    super();

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${ButtonSave.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${ButtonDelete.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.id = this.targetView?.id;

    (flag ? this.targetView : this).replaceWith(flag ? this : this.targetView);

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__reset-btn');

    buttonView.textContent = flag ? ButtonDelete.PRESSED : ButtonDelete.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(ViewEditor), ViewEditor);
