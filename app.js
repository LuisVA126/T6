const productosData = [
  { id: 1, nombre: 'iPhone 16 Pro', precio: 1099, categoria: 'apple', imagen: 'iphone16pro.png' },
  { id: 2, nombre: 'Samsung S24 Ultra', precio: 1199, categoria: 'samsung', imagen: 's24ultra.png' },
  { id: 3, nombre: 'Xiaomi 14 ', precio: 899, categoria: 'xiaomi', imagen: 'xiaomi14.png' },
  { id: 4, nombre: 'iPhone 15', precio: 799, categoria: 'apple', imagen: 'iphone15.png' },
  { id: 5, nombre: 'Samsung Z Flip 5', precio: 999, categoria: 'samsung', imagen: 'zflip.png' },
  { id: 6, nombre: 'Xiaomi Redmi Note 13', precio: 299, categoria: 'xiaomi', imagen: 'redminote13.png' },
  { id: 7, nombre: 'iPhone SE', precio: 429, categoria: 'apple', imagen: 'iphonese.png' },
  { id: 8, nombre: 'Samsung A56', precio: 449, categoria: 'samsung', imagen: 'a56.png' },
  { id: 9, nombre: 'Xiaomi Poco X5', precio: 299, categoria: 'xiaomi', imagen: 'pocox5.png' },
  { id: 10, nombre: 'iPhone 15 Pro Max', precio: 1299, categoria: 'apple', imagen: 'i15pro.png' }
];

function Producto({ producto, esFavorito, onAddToCart, onToggleFavorito }) {
  return (
    <div className="producto">
      <img src={`images/${producto.imagen}`} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <div className="producto-acciones">
        <button className="btn btn-primary" onClick={() => onAddToCart(producto)}>
          <i className="fas fa-cart-plus"></i> Agregar
        </button>
        <button 
          className={`btn btn-favorito ${esFavorito ? 'active' : ''}`}
          onClick={() => onToggleFavorito(producto.id)}
        >
          <i className="fas fa-heart"></i>
          {esFavorito ? ' Quitar' : ' Favorito'}
        </button>
      </div>
    </div>
  );
}

function Categorias({ categorias, categoriaActiva, onSelectCategoria }) {
  return (
    <div className="categorias">
      {categorias.map(categoria => (
        <button
          key={categoria}
          className={`categoria-btn ${categoriaActiva === categoria ? 'active' : ''}`}
          onClick={() => onSelectCategoria(categoria)}
        >
          {categoria === 'todos' ? 'Todos' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </button>
      ))}
    </div>
  );
}

function Carrito({ items, onRemoveItem }) {
  const total = items.reduce((sum, item) => sum + item.precio, 0);
  
  return (
    <div className="carrito-sidebar">
      <h2><i className="fas fa-shopping-cart"></i> Carrito ({items.length})</h2>
      <div className="cart-items">
        {items.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="item-carrito">
              <div className="item-info">
                <p className="item-title">{item.nombre}</p>
                <p className="item-price">${item.precio}</p>
              </div>
              <button 
                className="remove-item"
                onClick={() => onRemoveItem(item.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        Total: $<span>{total}</span>
      </div>
      <button className="checkout-btn">
        Finalizar Compra
      </button>
    </div>
  );
}

function Favoritos({ productos }) {
  return (
    <div className="favoritos">
      <h2><i className="fas fa-heart"></i> Favoritos ({productos.length})</h2>
      {productos.length === 0 ? (
        <p>No tienes productos favoritos</p>
      ) : (
        productos.map(producto => (
          <div key={producto.id} className="favorito-item">
            <img src={`images/${producto.imagen}`} alt={producto.nombre} />
            <div className="favorito-info">
              <p className="favorito-name">{producto.nombre}</p>
              <p className="favorito-price">${producto.precio}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function App() {
  const [productos] = React.useState(productosData);
  const [carrito, setCarrito] = React.useState([]);
  const [favoritos, setFavoritos] = React.useState([]);
  const [categoriaActiva, setCategoriaActiva] = React.useState('todos');

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const toggleFavorito = (id) => {
    setFavoritos(
      favoritos.includes(id) 
        ? favoritos.filter(favId => favId !== id) 
        : [...favoritos, id]
    );
  };

  const productosFiltrados = categoriaActiva === 'todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="app">
      <h1>ELITE MOBILE</h1>
      
      <Categorias 
        categorias={['todos', 'apple', 'samsung', 'xiaomi']} 
        categoriaActiva={categoriaActiva}
        onSelectCategoria={setCategoriaActiva}
      />
      
      <main>
        <div className="productos-container">
          {productosFiltrados.map(producto => (
            <Producto
              key={producto.id}
              producto={producto}
              esFavorito={favoritos.includes(producto.id)}
              onAddToCart={agregarAlCarrito}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </div>
      </main>
      
      <aside>
        <Carrito 
          items={carrito} 
          onRemoveItem={quitarDelCarrito}
        />
        <Favoritos 
          productos={productos.filter(p => favoritos.includes(p.id))} 
        />
      </aside>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);