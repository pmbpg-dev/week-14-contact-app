# Contact App 

A modern contact app web aplication, and users can manage contacts.

___

## Feature 

- ✅ Add, view, and manage contacts
- ✅ Filter contacts by:
  - Groups
  - Gender
  - Favorites
  - Search by name
- ✅ Selecet multiple contacts & groups for bulk delete
- ✅ Add and manage groups
- ✅ Add contacts in group
- ✅ Add favorites contacts


___
## Technologies Used

- **React** – Functional components & hooks  
- **React Context** – State management  
- **CSS Modules** – Scoped styling  
- **React Icons** – For UI icons  
- **JavaScript (ES6+)** – Modern JS features  
- **Formik** - for form handler
- **Yup** - For form validate
- **Axios** - for fetching data
- **json-server** - for database
---


## Installation

1. install node_modules:

```npm
npm install
```
2. run json-server
```npm
cd ./src/db
npx json-server --watch contact.json --port 3000
```
3. run project
```npm
npm run dev
```
___
## Project Structure
```
src
├── api
│   └── config.js
├── components
│   ├── context
│   │   ├── ContactProvider.jsx
│   │   ├── GroupsProvider.jsx
│   │   └── UiProvider.jsx
│   ├── inputs
│   │   ├── Checkbox.jsx
│   │   ├── FormRadio.jsx
│   │   ├── FormRadio.module.css
│   │   ├── Input.jsx
│   │   └── Input.module.css
│   ├── modules
│   │   ├── AddContact.jsx
│   │   ├── AddContact.module.css
│   │   ├── AlertBox.jsx
│   │   ├── AlertBox.module.css
│   │   ├── ConfirmBox.jsx
│   │   ├── ConfirmBox.module.css
│   │   ├── CreateGroup.jsx
│   │   ├── CreateGroup.module.css
│   │   ├── DeleteGroup.jsx
│   │   ├── DeleteGroup.module.css
│   │   ├── EditGroup.jsx
│   │   └── EditGroup.module.css
│   └── ui
│       ├── Contact.jsx
│       ├── Contact.module.css
│       ├── GroupBtn.jsx
│       ├── GroupBtn.module.css
│       ├── Loader.jsx
│       ├── SearchFilter.jsx
│       └── SearchFilter.module.css
├── data
│   └── inputArray.js
├── db
│   └── contact.json
├── helpers
│   ├── filterContacts.js
│   └── getGroupName.js
├── layouts
│   ├── ContactInfo.jsx
│   ├── ContactInfo.module.css
│   ├── ContactList.jsx
│   ├── ContactList.module.css
│   ├── Header.jsx
│   ├── Header.module.css
│   ├── SideBar.jsx
│   └── SideBar.module.css
├── validation
│   └── validation.js
├── App.css
├── App.jsx
└── main.jsx
```
___
## Preview

<img width="1918" height="867" alt="Screenshot 2025-11-24 134351" src="https://github.com/user-attachments/assets/c09c0d72-4b98-44a1-a585-0e73ebae8a65" />
