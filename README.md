# Books Loans App with Express and MySql
This app was build for learning purpose

## Entity Relation Diagram
The relational of the database and diagram design. 
- One to Many (author to books): one author can have many books
- Many to Many (books to genres): one books can have many genres and one genre can have many books
- One to Many (users to loans): one user can have many loans
- One to Many (users to pinalties): one user can have many pinalties
- One to Many (role to user) : one role can have many users
- One to Many (book to language) : one language can have many books
- One to Many (nationaltity to authors) : one nationality can have many authors

![image](https://github.com/HenSetiawan/books-loan-express/blob/main/docs/book-loan.png)

## Use Case
 - Auth
    - [ ]  Users can login with their account
    - [ ]  Auth use JWT token
    - [ ]  Auth implement refresh token
    - [ ]  Users can logout