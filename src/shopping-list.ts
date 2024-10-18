import { component, useEffect, useState, html } from 'haunted';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onAddToShoppingList = (event: CustomEvent) => {
      setIngredients((prevIngredients) => {
        const uniqueIngredients = [...prevIngredients, ...event.detail];
        return Array.from(new Set(uniqueIngredients));
      });
    };
    document.addEventListener('add-ingredients', onAddToShoppingList);

    return () => {
      document.removeEventListener('add-ingredients', onAddToShoppingList);
    };
  }, []);

  const removeListItem = (item: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== item)
    );
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return html`
    <div>
      <h2>Shopping List</h2>
      <ul>
        ${ingredients.map(
          (ingredient) =>
            html`<li>
              ${ingredient}
              <button @click=${() => removeListItem(ingredient)}>x</button>
            </li>`
        )}
      </ul>
      <button @click=${openDialog} ?disabled=${ingredients.length === 0}>
        Print Shipping List
      </button>
    </div>
    <dialog ?open=${open}>
      <h3>Your Printed Shopping List</h3>
      ${ingredients.map((i) => html`<p>${i}</p>`)}
      <button @click=${closeDialog}>Close</button>
    </dialog>

    <style>
      h2 {
        margin: 0;
      }
      ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style-type: none;
      }
      dialog {
        position: fixed;
        top: 20px;
        width: 300px;
        background-color: wheat;
      }
      button {
        cursor: pointer;
      }
    </style>
  `;
};

customElements.define('shopping-list', component<HTMLElement>(ShoppingList));
