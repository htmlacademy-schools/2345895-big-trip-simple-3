import FiltersView from './view/view-filter.js';
import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/model-point.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pointsModel = new PointModel();

render(new FiltersView(), tripControlsFilters);

const boardPresenter = new BoardPresenter(tripEventsSection, pointsModel);
boardPresenter.init();
