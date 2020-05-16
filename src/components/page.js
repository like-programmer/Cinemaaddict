import AbstractComponent from "./abstract-component.js";

const createPageTemplate = () => {
  return (`<section class="films">
           <section class="films-list">
             <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
           </section>
       
           <section class="films-list--extra">
             <h2 class="films-list__title">Top rated</h2>
           </section>
       
           <section class="films-list--extra">
             <h2 class="films-list__title">Most commented</h2>
           </section>
         </section>`);
};

export default class Page extends AbstractComponent {
  getTemplate() {
    return createPageTemplate();
  }
}
