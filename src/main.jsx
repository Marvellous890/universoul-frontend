import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/ProductContext";
import SidebarProvider from "./context/SidebarContext";
import CartProvider from "./context/CartContext";
import ConversationContextProvider from "./context/ConversationContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ConversationContextProvider >
    <SidebarProvider>
      <CartProvider>
        <ProductProvider>
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>
        </ProductProvider>
      </CartProvider>
    </SidebarProvider>
  </ConversationContextProvider>
);
