import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/Dashboard/About/About";
import ContactForm from "./pages/Dashboard/Contact/Contact";
import Login from "./pages/Dashboard/Login/Login";
import Register from "./pages/Dashboard/Register/Register";
import BookList from "./pages/user/user_dashboard/BookList";
import NotFound from "./shared/not found";
import BorrowedBooks from "./pages/user/borrowedBooks/BorrowedBooks";
import RegistrationReq from "./pages/admin/RegistrationRequests/RegistrationReq";
import BorrowingReq from "./pages/admin/BorrowingRequests/BorrowingReq";
import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";
import Guest from "./middleware/user";

import Admin from "./middleware/admin";
import BookCards from "./pages/user/book_cards/BookCards";




export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
      },
      {
        element: <Guest />,
        children: [

          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ]
      },
      {
        element: <Admin />,
        children: [
          {
            path: "/AdminDashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/RegistrationReq",
            element: <RegistrationReq />,
          },
          {
            path: "/BorrowingReq",
            element: <BorrowingReq />,
          },
        ],
      },

      {
        path: "/BookList",
        element: <BookList />,
      },
      {
        path: "/BorrowedBooks",
        element: <BorrowedBooks />,
      },
      {
        path: "/BookCards",
        element: <BookCards />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
