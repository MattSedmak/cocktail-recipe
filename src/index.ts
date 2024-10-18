import { component, useState, html } from 'haunted';
import { mapCocktails } from './utils/uitls';
import { Cocktail } from './types';
import './search-input';
import './cocktail-list';
import './shopping-list';

function App() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      if (!res.ok) {
        throw new Error(`Error fetching cocktails: ${res.statusText}`);
      }
      const data = await res.json();
      const mappedCocktails = mapCocktails(data.drinks);
      setCocktails(mappedCocktails);
      setQuery('');
    } catch (error) {
      console.error('Failed to fetch cocktails:', error);
    }
  };

  return html`
    <main>
      <search-input
        .query=${query}
        .setQuery=${setQuery}
        .handleSubmit=${handleSubmit}
      ></search-input>
      <section class="grid">
        <cocktail-list class="cocktail-list" .cocktails=${cocktails}></cocktail-list>
        <shopping-list class="shopping-list"></shopping-list>
      </section>
    </main>

    <style>
      main {
        font-family: sans-serif;
      }
      .grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
        padding-top: 20px;
      }
      .cocktail-list {
        grid-column: span 2 / span 2;
      }
      .shopping-list {
        grid-column: span 1;
        grid-column-start: 3;
        height: auto;
        align-self: start;
      }
      .toast-container {
        position: fixed;
        z-index: 1;
        bottom: 0;
        right: 0;
        background: pink;
        padding: 20px;
      }
    </style>
  `;
}

customElements.define('cocktail-app', component(App));
