# **App Name**: ShopSphere

## Core Features:

- Product Listing: Display a grid of products fetched from the FakeStore API, showing image, title, price, and category.
- Product Detail View: Display detailed information for a selected product, including image, title, price, category, and description.
- Responsive Layout: Implement a responsive layout that adapts to different screen sizes (mobile, tablet, desktop).

## Style Guidelines:

- Primary color: Light gray (#f0f0f0) for background.
- Secondary color: Dark gray (#333) for text.
- Accent: Teal (#008080) for interactive elements and highlights.
- Use a grid-based layout for product listings to ensure consistency.
- Simple, consistent icons for navigation and actions.

## Original User Request:
Use API: Use the FakeStore API — https://fakestoreapi.com/products
Pages & Routing:
Product Listing Page (/ or /products)
Fetch and display a grid or list of products.
Each product should show: Image, Title, Price, Category.
Basic loading state UI while fetching data.
Basic error handling if API fails.
Clicking on a product navigates to Product Detail Page.
Product Detail Page (/products/[id])
Fetch and display detailed info for a product using its ID.
Display: Image, Title, Price, Category, Description.
Handle invalid IDs or API failures gracefully.
Provide a way to navigate back to the Product Listing Page.
Data Fetching:
Use appropriate Next.js data fetching methods (getStaticProps, getServerSideProps, useEffect, etc.).
Justify your data fetching strategy in the README.
Responsiveness:
Application layout must be responsive (mobile, tablet, desktop).

Code Quality & Structure:
Organize code into logical components and folders.
Write clean, readable, maintainable code.
Use functional components and React Hooks.
Use next/link for navigation and next/image for optimized images.
Bonus Features (Optional)
Filtering products by category.
Sorting products by price (ascending/descending) or title.
Search bar to filter products by title.
State management with useReducer or useContext if state grows complex.
Loading skeletons for a better loading experience.
Pagination (you can mock client-side pagination).
Basic unit testing with Jest and React Testing Library.
TypeScript implementation if initially done in JavaScript.
Deploying the app to Vercel or Netlify.
  