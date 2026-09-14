# Translation Management App

This project is a React and Vite application for managing multilingual keyword translations.

## 1. Why was this data structure chosen, and how does it handle a new language?

Each keyword is represented by one object containing a stable `id`, a language-independent `key`, and one translation field per supported language:

```js
{
  id: 1,
  key: "home",
  fa: "خانه",
  en: "Home",
  fr: "Accueil"
}
```

This structure was chosen because it is simple, readable, and well suited to the current client-side application. A keyword and all of its translations are stored together, so editing, deleting, filtering, sorting, importing, exporting, and localStorage persistence remain straightforward. Translation lookup is direct: the UI can use computed access such as `item[currentLang]` without requiring a separate join or lookup table. The `key` is independent from translated text and serves as a stable identifier for application logic and JSON files, while `id` is used for React rendering and drag-and-drop behavior.

Adding a new language is relatively easy. The application needs to add the language metadata to `AVAILABLE_LANGUAGES` and include the new language code as a property on keyword objects, for example `de: "Startseite"`. Components that use dynamic access such as `item[currentLang]` can continue working without a major redesign. Some language-specific UI elements, validation rules, column layouts, and initial data may still need updates. The trade-off is that the flat structure becomes wider as languages are added, so a larger system might eventually prefer a nested `translations` object.

## 2. How would the application scale to thousands of keywords and many languages? What would become the first bottleneck?

For thousands of keywords and many languages, persistence and search should move from browser localStorage to a backend database and API. The database could separate `keywords`, `languages`, and `translations` into related tables. Translation rows could be indexed by `(keyword_id, language_code)`, while keyword keys and frequently searched text would receive appropriate indexes. The API could provide pagination, server-side filtering, sorting, and incremental updates instead of sending the complete dataset to the browser.

On the frontend, the application should avoid loading every translation at once. Virtualized lists or paginated results, memoized selectors, debounced search, and a client-side cache such as React Query would help. Import/export should be processed asynchronously, possibly as background jobs for very large files. Language metadata and translation bundles could also be loaded on demand so users download only the languages they need.

The first bottleneck in the current implementation would be the combination of localStorage and client-side array processing. Every change serializes the complete keyword array and writes it to localStorage, while searches and filters scan the entire array in memory. localStorage is synchronous, limited in size, and not designed for concurrent or multi-user access. Rendering thousands of rows without virtualization would become the next visible bottleneck. Moving persistence, search, pagination, and filtering to the server would address the most important limitations first.

## Data persistence

On the first load, the application uses the initial keywords from `src/data/initialData.js` when no valid data exists in localStorage. After a user makes changes, the updated keyword list is saved to localStorage and restored on later loads.

## Development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run build
```
