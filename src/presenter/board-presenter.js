import { render, replace } from '../framework/render.js';
import PointsView from '../view/view-point.js';
import ViewSort from '../view/view-sort.js';
import ViewList from '../view/view-eventlist.js';
import EditPointView from '../view/edit-pointview.js';
import ViewEmp from '../view/view-list.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  eventsList = new ViewList();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = this.#pointsModel.points;

    render(new ViewSort(), this.#boardContainer);
    render(this.eventsList, this.#boardContainer);
    // render(new NewPointView(this.#boardPoints[1]), this.eventsList.element);

    if (this.#boardPoints.length > 0) {
      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    } else {
      render(new ViewEmp(), this.eventsList.element);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointsView(point);
    const editPointComponent = new EditPointView(point);

    const replaceEditFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };

    const replacePointToEditForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setPointClickHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setEditClickHandler(() => {
      replaceEditFormToPoint();

    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.eventsList.element);
  };
}
