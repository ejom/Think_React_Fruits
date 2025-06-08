import { useState } from 'react'
import './styles.css'

export default App

function App() {
  //render
  return (
    <>
      <div className="App">
        <MainScreen 
          products={PRODUCTS}
        />
      </div>
    </>
  )
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function MainScreen() {
  const [filter, setFilter] = useState('');
  const [stockedCheck, setStockedCheck] = useState(false);

  return (
      <>
        <SearchBar 
          setFilter={setFilter}
          setStocked={setStockedCheck}
        />
        <ProductTable 
          products={PRODUCTS}
          filter={filter}
          stocked={stockedCheck}
        />
      </>
  )
}

function SearchBar({ setFilter, setStocked }) {
  return (
    <form>
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={(event) => setFilter(event.target.value)}
      />
      <label>
        <input 
          type="checkbox" 
          onChange={(event) => setStocked(event.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, filter, stocked }) {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if (!(product.name.toLowerCase().includes(filter.toLowerCase()))) {
      return;
    }

    if (stocked && !(product.stocked)) {
      return;
    }

    if (product.category != lastCategory) {
      rows.push(
        <ProductCategory 
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );

    lastCategory=product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function ProductCategory({ category }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>

  return(
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
