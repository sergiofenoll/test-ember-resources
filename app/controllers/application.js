import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { trackedFunction } from 'ember-resources/util/function';

export default class ApplicationController extends Controller {

  filters = ['Authors', 'Genres'];

  @tracked selectedFilter;
  @tracked authors = [];
  @tracked genres = [];

  allAuthors = ['George R. R. Martin', 'Frank Herbert', 'Strugatsky Brothers'];

  allGenres = trackedFunction(this, async () => {
    await new Promise(r => setTimeout(r, 1000));
    return ['Fantasy', 'Sci-fi'];
  });

  @action
  updateSelectedFilter(filter) {
    this.selectedFilter = filter;
    this.generateQuery();
  }

  @action
  updateSelectedAuthors(authors) {
    this.authors = authors;
    this.generateQuery();
  }

  @action
  updateSelectedGenres(genres) {
    this.genres = genres;
    this.generateQuery();
  }

  /* If nothing is selected, return all genres by default, otherwise return based
   * on selected content.
   */
  @action
  generateQuery() {
    let query = [];
    if (this.selectedFilter === 'Authors') {
      if (this.authors.length) {
        query = this.authors;
      } else {
        query = this.allAuthors;
      }
    } else {
      if (this.genres.length) {
        query = this.genres;
      } else {
        query = this.allGenres.value;
        // I'd expect to be able to await this value somehow, 
        // so that the first time the button is clicked, I can
        // still produce meaningful output (by waiting for the
        // async function in allGenres to be resolved).
      }
    }
    console.debug(query);
  }
}
