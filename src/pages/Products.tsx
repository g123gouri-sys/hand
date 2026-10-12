import { Eye, Filter, Pencil, Search, Trash2, X } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Navbar } from '../components/dashboard/Navbar'
import { Sidebar } from '../components/dashboard/Sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'

type Product = { id: number; name: string; category: string; price: string; stock: number; status: 'In Stock' | 'Low Stock'; image: string }
const seed: Product[] = [
  ['MacBook Air M2', 'Laptops', '$1,199.00', 25, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80'],
  ['iPhone 15 Pro', 'Phones', '$999.00', 40, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=120&q=80'], 
  ['Sony WH-1000XM5', 'Audio', '$349.00', 15, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80'], 
  ['Apple Watch Series 9', 'Wearables', '$399.00', 30, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=120&q=80'],
  ['Canon EOS R50', 'Cameras', '$679.00', 8, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=120&q=80'], 
  ['Nike Air Force 1', 'Shoes', '$110.00', 50, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80'], 
  ['Herschel Classic Backpack', 'Bags', '$89.99', 20, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=120&q=80'],
].map(([name, category, price, stock, image], index) => ({ id: index + 1, name: String(name), category: String(category), price: String(price), stock: Number(stock), status: Number(stock) < 16 ? 'Low Stock' as const : 'In Stock' as const, image: String(image) }))

export default function Products() {
  const [query, setQuery] = useState(''); const [products, setProducts] = useState(seed)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const shown = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [products, query])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelectedProduct(null); setEditingProduct(null) }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeDrawer = () => { setSelectedProduct(null); setEditingProduct(null) }
  const status = (product: Product) => product.status
  const saveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingProduct) return
    setProducts((all) => all.map((product) => product.id === selectedProduct?.id ? editingProduct : product))
    closeDrawer()
  }

  return <main className="dashboard-shell">
    <Sidebar />
    <section className="main-area table-list-area products-page">
      <Navbar title="Products" />
      <div className="table-list-content products-content">
        <section className="products-card">
          <div className="products-heading">
            <div>
              <h4>All Products</h4>
              <p>List of all available products in your store</p>
            </div>
            <div className="product-toolbar">
              <label className="product-search">
                <Search />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
              </label>
              <button className="filter-button">
                <Filter />Filter
              </button>
              
            </div>
          </div>
          <div className="products-table-wrap">
            <Table className="products-table">
              <TableHeader>
                <TableRow><TableHead>ID</TableHead><TableHead>PRODUCT</TableHead><TableHead>CATEGORY</TableHead><TableHead>PRICE</TableHead><TableHead>STOCK</TableHead><TableHead>STATUS</TableHead><TableHead>ACTIONS</TableHead></TableRow>
              </TableHeader>
              <TableBody>{shown.map((p) => <TableRow key={p.id}><TableCell>{p.id}</TableCell>
               <TableCell>
                 <div className="product-name"><span className="product-image-container"><img src={p.image} alt="" /></span>
                   <strong>{p.name}</strong>
                 </div>
                </TableCell><TableCell><span className={`category ${p.category.toLowerCase()}`}>{p.category}</span></TableCell><TableCell>{p.price}</TableCell><TableCell>{p.stock}</TableCell><TableCell><span className={`stock-status ${p.status === 'Low Stock' ? 'low' : ''}`}>{status(p)}</span></TableCell><TableCell><div className="row-actions"><button aria-label={`View ${p.name} details`} onClick={() => { setEditingProduct(null); setSelectedProduct(p) }}><Eye /></button><button aria-label={`Edit ${p.name}`} onClick={() => { setSelectedProduct(p); setEditingProduct({ ...p }) }}><Pencil /></button><button className="delete" aria-label={`Delete ${p.name}`} onClick={() => setProducts((all) => all.filter((product) => product.id !== p.id))}><Trash2 /></button></div></TableCell></TableRow>)}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
      <div className={`product-drawer-layer ${selectedProduct ? 'is-open' : ''}`} aria-hidden={!selectedProduct}>
        <button className="product-drawer-backdrop" aria-label="Close product drawer" tabIndex={selectedProduct ? 0 : -1} onClick={closeDrawer} />
        <aside className="product-drawer" aria-label={editingProduct ? 'Edit product' : 'Product details'} aria-modal="true" role="dialog">
          {selectedProduct && <>
            <header className="product-drawer-header">
              <div><p>{editingProduct ? 'Edit product' : 'Product details'}</p><h2>{selectedProduct.name}</h2></div>
              <button type="button" aria-label="Close product drawer" onClick={closeDrawer}><X /></button>
            </header>
            {editingProduct ? 
            <form className="product-edit-form" onSubmit={saveProduct}>
              <div className="product-image-field"><img className="product-drawer-image" src={editingProduct.image} alt={editingProduct.name} /></div>
              <label><span>Product name</span><input value={editingProduct.name} onChange={(event) => setEditingProduct({ ...editingProduct, name: event.target.value })} /></label>
              <label><span>Product ID</span><input type="number" min="1" value={editingProduct.id} onChange={(event) => setEditingProduct({ ...editingProduct, id: Number(event.target.value) })} /></label>
              <label><span>Category</span><input value={editingProduct.category} onChange={(event) => setEditingProduct({ ...editingProduct, category: event.target.value })} /></label>
              <label><span>Price</span><input value={editingProduct.price} onChange={(event) => setEditingProduct({ ...editingProduct, price: event.target.value })} /></label>
              <label><span>Stock</span><input type="number" min="0" value={editingProduct.stock} onChange={(event) => setEditingProduct({ ...editingProduct, stock: Number(event.target.value) })} /></label>
              <label><span>Status</span><select value={editingProduct.status} onChange={(event) => setEditingProduct({ ...editingProduct, status: event.target.value as Product['status'] })}><option>In Stock</option><option>Low Stock</option></select></label>
              <div className="product-edit-actions"><button type="button" onClick={closeDrawer}>Cancel</button><button type="submit">Save changes</button></div>
            </form> :
            <div className="product-drawer-content">
              <img className="product-drawer-image" src={selectedProduct.image} alt={selectedProduct.name} />
              <dl className="product-detail-list">
                <div><dt>Product name</dt><dd>{selectedProduct.name}</dd></div>
                <div><dt>Product ID</dt><dd>#{selectedProduct.id}</dd></div>
                <div><dt>Category</dt><dd>{selectedProduct.category}</dd></div>
                <div><dt>Price</dt><dd>{selectedProduct.price}</dd></div>
                <div><dt>Stock</dt><dd>{selectedProduct.stock} units</dd></div>
                <div><dt>Status</dt><dd><span className={`stock-status ${selectedProduct.status === 'Low Stock' ? 'low' : ''}`}>{status(selectedProduct)}</span></dd></div>
              </dl>
            </div>}
          </>}
        </aside>
      </div>
    </section>
  </main>
}
