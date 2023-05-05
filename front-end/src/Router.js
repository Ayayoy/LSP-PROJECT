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
import BookCard from "./pages/admin/book_card/BookCard";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
        path: "/AdminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/BookCard",
        element: <BookCard />,
      },
      {
        path: "/BookCards",
        element: <BookCards />,
      },
      {
        path: "/RegistrationReq",
        element: <RegistrationReq />,
      },
      {
        path: "/BorrowingReq",
        element: <BorrowingReq />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
