Description:
E-Form is a software that manages digital application form designed to help individuals and businesses create, manage, and store application forms electronically. 
This type of software simplifies the process of creating, tracking, and executing applications, making it easier for businesses to manage their files. 
Every file will run according to order of a approval process included a group of signers. For instance, an employee wants to have a day off, he will write a file called "Request for leave" 
by creating a bunch of textboxes, input text like his name, date, ..., on E-Form web page, then he submits the form. Assumed the form has 2 signers A and B, this application will go to A first, 
he signs by dragging a signature in the right position on the form and send to the next one. Owner of the form can track down this file, see who is approving.

Features:
- Allow users to create textbox, input text, attach a file, drag signature on a .doc file on E-Form web page.
- Every form runs according to order of a approval process included a group of signers.
- Manage system - create/ edit/ view department, role, type form, permission
- Create account, edit account with changing permission flexibly ( not depends on role), deactivating, selecting signature, role, department.
- Manage template ( available in system for creating document) - create, approve/ reject template, use template
- Manage document ( running approval process) - create, approve/ reject document, share document to a department or users
- View statistics of templates in one/ all department
- View statistics of documents in one/ all department

Relevant Libraries/ Tools/ Programming Languages:
- Frontend: React 18 + Typescript, Material UI, Redux thunk, Tailwind, Firebase
- Backend: ASP.net 3.1, SQL server, Swagger

Folder structure:
E-Form-Client
│   README.md
│   LICENSE
│   .gitignore
│   package.json
│   tsconfig.json
│   tailwind.config.js
│   yarn.lock
│
└─── src
│   │   App.tsx
│   │   declaration.d.ts
│   │   index.tsx
│   │   
│   └─── util
│   │   api-paths.ts
│   │   constants.ts
│   │   http-client.ts
│   │   helpers.ts
│   │   mui-data.ts
│   │   ...
│   
└─── components
│   │   DataTable
│   │   RequiredPermission
│   │   ...
│   
└─── hooks ( custom hooks)
│   │   use-auth.ts
│   │   use-signalR.ts
│   │   use-selector.ts
│   │   use-permission.ts
│   │   use-dispatch.ts
│   
└─── i18n
│   │   locales
│   │   i18n.ts
│   
└─── models ( object/ response/ request types)
│   │   mui-data.ts
│   │   template.ts
│   │   ...
└─── pages
│   │   login
│   │   document
│   │   ...
└─── services ( handling requests, return object type)
│   │   document.ts
│   │   ...
└─── signalR
│   │   signalR.ts
│   │   signalR-model.ts
│   │   signalR-constant.ts
└─── slices
│   │   document.ts
│   │   ...
└─── assets
│   │   images and svg files
│   │   ...
