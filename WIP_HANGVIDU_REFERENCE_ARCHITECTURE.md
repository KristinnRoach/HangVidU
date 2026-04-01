# WIP HangVidU Reference Architecture

Reference repo for folder structure and import-boundary inspiration:

- [WebDevSimplified parity-deals-clone (feature-folder-structure)](https://github.com/WebDevSimplified/parity-deals-clone/tree/feature-folder-structure/)

Core idea for this HangVidU refactor:

- We are gradually defining a small allowed vocabulary of file and folder concepts with distinct responsibilities, using real refactors in `auth/`, `contacts/`, and neighboring code to test what actually works.
- No new concept name should be added to the allowed vocabulary unless an existing concept clearly does not fit and you explicitly confirm the addition.
