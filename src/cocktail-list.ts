import { component, virtual, html } from 'haunted';
import { Cocktail } from './types';

interface CocktailListProps extends HTMLElement {
  cocktails?: Cocktail[];
}

const CocktailCard = virtual(
  ({ name, instructions, thumbnailUrl, ingredients }: Cocktail) => {
    const addToShoppingList = (e: Event) => {
      const event = new CustomEvent('add-ingredients', {
        detail: ingredients,
        bubbles: true,
        composed: true,
      });
      e.target.dispatchEvent(event);
    };

    return html`
      <li>
        <img src=${thumbnailUrl} alt=${name} />
        <div>
          <h3>${name}</h3>
          <p>${instructions}</p>
          <button @click=${addToShoppingList}>Add to Shopping List</button>
        </div>
      </li>

      <style>
        li {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          padding: 20px;
          border: 1px solid gray;
        }
        img {
          aspect-ratio: 1/1;
          width: 100%;
          grid-column: span 1 / span 1;
        }
        h3 {
          margin: 0;
        }
        div {
          grid-column: span 2 / span 2;
        }
        button {
          cursor: pointer;
        }
      </style>
    `;
  }
);

const CocktailList = ({ cocktails }: CocktailListProps) => {
  return html`
    <div class="container">
      ${cocktails.length > 0
        ? html`<ul>
            ${cocktails.map((cocktail) => CocktailCard(cocktail))}
          </ul>`
        : html`<p>Use the search bar to find you favorite cocktail.</p>`}
    </div>

    <style>
      ul {
        margin: 0;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      p {
        margin: 0;
      }
    </style>
  `;
};

customElements.define('cocktail-list', component<CocktailListProps>(CocktailList));
