# Holidaze, a booking site by Prinyapon Prinyanut

![Screenshot 2023-11-30 at 7 19 16 PM](https://github.com/GeniePrinie/project-exam-2/assets/100139381/ea664fbe-c86d-4096-addf-61ccee2338f1)
![Screenshot 2023-11-30 at 7 26 07 PM](https://github.com/GeniePrinie/project-exam-2/assets/100139381/073a192a-f0ef-4ea5-a091-8b966b78ee34)



## Description

The project was to create a responsive booking site by using React.

## User Stories

- A user may view a list of Venues
- A user may search for a specific Venue
- A user may view a specific Venue page by id
- A user may view a calendar with available dates for a Venue
- A user with a stud.noroff.no email may register as a customer
- A registered customer may create a booking at a Venue
- A registered customer may view their upcoming bookings
- A user with a stud.noroff.no email may register as a Venue manager
- A registered Venue manager may create a Venue
- A registered Venue manager may update a Venue they manage
- A registered Venue manager may delete a Venue they manage
- A registered Venue manager may view bookings for a Venue they manage
- A registered user may login
- A registered user may update their avatar
- A registered user may logout

## Features
1. Display a list of venues.
2. Hamburger menus.
3. Edit button for each venues.
4. Delete button for each venues and bookings.
5. Book button for each venues.
6. Calendar for booking.
7. Calendar for see any booking.
8. Search functionality to filter products based on user input.
9. Responsive design for various screen sizes.
10. Fetch venue data from a provided REST API.
11. Set, get, clear item in LocalStorage.
12. Sign up form validation.
13. Sign in form validation.
14. Use React Router to switch between pages.
15. Contains header and footer by using < Layout > component.
16. Sign out button
17. Modals for each senarios. (ex: "your account has been created")


## Pages

1. Home Page
2. Venues Page
3. Venue Page
4. Manager Venue Page
5. Manager Venues Page
6. Profile Pages (both manager and normal user)
7. Bookings Page
8. Booking Success Page
9. Create Venue Page
10. Sign in page
11. Sign up page

Note: All pages has a hamburger menu on the top right corner

### Home page
This page is a welcome page, it has a list of most recent venues from Noroff API (which can be clicked to view in an individual venue page).

### Venues page
This page has a list of all venues from Noroff API (which can be clicked to view in an individual venue page) and a robust search bar that filters products when typing in a product name.

### Venue Page
This page displays an individual venue that was clicked to view from the Venues page. Users can view images of the venue and book it by clicking on the calendar and selecting 'book'. If the user is not signed in, the button will navigate them to the sign-in page. Only accounts labeled as 'customer' are allowed to book the venue. Once the venue is booked, the page will navigate to a booking success page.

### Manager Venue Page
This page displays an individual venue that was clicked to view from the Venues page. Only accounts labeled as 'manager' and owner of the venue can see this. The manager can see the any bookings that were booked on this venue. The manager can also delete or edit the venue.

### Manager Venues Page
This page displays all the venues that a user(manager) has created. The user can go into each venue to delete or edit.

### Profile Page
This page displays a profile of the user depending on the satus of the user (customer or manager).

### Bookings Page
This page displays all the bookings of a user(customer). The user can delete any bookngs that they had booked.

### Booking Success Page
This page displays a message to the customer notifying them that their booking was successful, shows the booking summary of what the customer has booked, and a button to go back to Home page.

### Create Venue Page
This page shows a Create Venue form that can validate what the user types in. Only Manager can see this page. After a venue has been created, it will navigate the manager to Manager Venues page.

### Sign in Page
This page shows a Sign in form that can validate what the user types in. Any one with the @stud.noroff.no account can sign in as a user.

### Sign up Page
This page shows a Sign up form that can validate what the user types in. Any one can create an account as a customer or a manager to sign in with the @stud.noroff.no.

#### Validation requirement for Create venue form
1. Venue's name (required)
2. Description (required)
3. Price (required)
4. Rating (Minimum 0, Maximum 5, required)
5. Max Guests (Minimum 1, Maximum 100, required)
6. Metas (default is no)
7. Create button

#### Validation requirement for Sign in form
1. Email (Only @stud.noroff.no domains are allowed, required)
2. PassWord (Must be at least 8 characters, required)
3. Sign in button

#### Validation requirement for Sign up form
1. Name (Must be at least 3 characters)
2. Email (Only @stud.noroff.no domains are allowed, required)
3. PassWord (Must be at least 8 characters, required)
4. User type (default is customer)
5. Sign up button


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
