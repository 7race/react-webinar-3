import { createRoot } from "react-dom/client";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleInfo from "./components/article-info";
// import Head from "./components/head";
// import BasketTool from "./components/basket-tool/";

const store = new Store();

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "articles/:id",
        element: <ArticleInfo />,
      },
    ],
  },
]);

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
