import { component, useEffect, useState, html } from 'haunted';

interface SearchProps {
  query: string;
  setQuery: (q: string) => void;
  handleSubmit: () => void;
}

const Search = ({ handleSubmit, setQuery, query }: SearchProps) => {
  return html`
    <header>
      <form @submit=${handleSubmit}>
        <input
          type="text"
          placeholder="Search cocktails..."
          .value=${query}
          @keyup=${(e) => setQuery(e.target.value.trim())}
        />
        <button type="submit">search</button>
      </form>
    </header>

    <style>
      header {
        padding: 16px;
        background-color: lightblue;
      }
      form {
        display: flex;
        max-width: 300px;
        margin: 0 auto;
      }
      input {
        width: 100%;
        padding: 10px;
      }
    </style>
  `;
};

customElements.define('search-input', component(Search));
