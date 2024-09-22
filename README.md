# ft_transcendence

-> Creating the folder structure for the project  
-> installed the envirement for the backend (DRF)  
-> Design the authentification (Sign In && Sign Up)  
-> Implemented the design in frontend with react.js  
-> learning more about JWT in Django Rest Framework for implementing the backend authentification   
-> (to do ) design more frames for the project ...  

# DRF  
**Model (Database Layer)**
>A model in Django (or DRF) represents the structure of your data and the tables in the database. Think of a model as a blueprint for   creating objects that are stored in a database.  
>Imagine you are filling out a form for a library card. The form asks for specific details like your name, email, and address. The model defines what fields you need (e.g., name, email, address) and the types of data (e.g., text, integers, dates).

**View (Logic Layer)**
> A view in DRF handles the logic of what happens when a user makes a request (GET, POST, etc.) to a specific URL. It’s where you define what  should be returned when someone requests data or what happens when someone submits data.  
> Think of a view as a clerk at a library. If you walk into the library (or make a request to a URL), the clerk decides what happens next: they may help you find a book (GET request), or accept your new book for return (POST request).  

**URL (Routing Layer)**
> A URL is the address or path that someone visits to access a specific view. It’s like the address of a house. In Django, the URL is how the system knows which view to call when a request is made.  
> When you visit a website, you type a URL (like example.com/books/). That URL leads to a specific page (or view) on the website, which shows you the data you requested (like a list of books).  

**Steps for JWT authentification**  

![alt text](16new.png)  

$ User starts by logging in using a login form implemented with React  
$ This causes the React code to send the username and the password to the server address /api/login as an HTTP POST request.  
$ If the username and the password are correct, the server generates a token that somehow identifies the logged-in user.  
$ The backend responds with a status code indicating the operation was successful and returns the token with the response.  
$ The browser saves the token, for example to the state of a React application.  
$ When the user creates a new note (or does some other operation requiring identification), the React code sends the token to the server with the request.  
$ The server uses the token to identify the user  








