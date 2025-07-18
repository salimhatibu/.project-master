<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminBooks from './pages/Admin/Books';
import AdminOrders from './pages/Admin/Orders';
import AdminCategories from './pages/Admin/Categories';
import AdminReports from './pages/Admin/Reports';
import ProtectedRoute from './components/common/ProtectedRoute';
import TopBar from './components/common/TopBar';
import SideBar from './components/common/SideBar';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <AuthProvider>
      <CartProvider>
        <DataProvider>
    <Router>
            <TopBar />
            <div style={{ display: 'flex' }}>
              {isAdminRoute && <SideBar />}
              <div style={{ flex: 1, marginLeft: isAdminRoute ? 220 : 0, padding: '2rem 1rem' }}>
          <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/:id" element={<BookDetails />} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
                  <Route path="/admin/books" element={<ProtectedRoute adminOnly={true}><AdminBooks /></ProtectedRoute>} />
                  <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
                  <Route path="/admin/categories" element={<ProtectedRoute adminOnly={true}><AdminCategories /></ProtectedRoute>} />
                  <Route path="/admin/reports" element={<ProtectedRoute adminOnly={true}><AdminReports /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
          </Routes>
              </div>
      </div>
    </Router>
        </DataProvider>
      </CartProvider>
    </AuthProvider>
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BooksPage from "./components/BooksPage";
import BookDetailPage from "./components/BookDetailPage";

// Dummy data for The book shop
export const booksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
    description:
      "Set in the Jazz Age on Long Island, this novel explores themes of decadence, idealism, and the American Dream through the story of the mysterious millionaire Jay Gatsby.",
    genre: "Classic",
    pages: 180,
    publishedYear: 1925,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    description:
      "A powerful story of racial injustice and the loss of innocence in the American South, told through the eyes of young Scout Finch.",
    genre: "Classic",
    pages: 281,
    publishedYear: 1960,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 11.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg",
    description:
      "A dystopian novel that explores totalitarianism, surveillance, and the manipulation of truth in a future society.",
    genre: "Science Fiction",
    pages: 328,
    publishedYear: 1949,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 13.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    description:
      "A classic romance novel that follows the emotional development of Elizabeth Bennet as she learns about the repercussions of hasty judgments.",
    genre: "Romance",
    pages: 432,
    publishedYear: 1813,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 15.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
    description:
      "A fantasy novel about Bilbo Baggins, a hobbit who embarks on an unexpected journey with a group of dwarves to reclaim their homeland.",
    genre: "Fantasy",
    pages: 310,
    publishedYear: 1937,
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 16.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",
    description:
      "The first book in the Harry Potter series, introducing readers to the magical world of Hogwarts School of Witchcraft and Wizardry.",
    genre: "Fantasy",
    pages: 223,
    publishedYear: 1997,
  },
];

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>BookStore</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
>>>>>>> d99a617726b38bedbf3e3f2ca9189a274dab6659
  );
}

export default App;
