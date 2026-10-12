import { ChevronLeft, ChevronRight, Eye, FileText, Filter, Search, Truck, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../components/dashboard/Navbar'
import { Sidebar } from '../components/dashboard/Sidebar'

type OrderStatus = 'Completed' | 'Processing' | 'Cancelled'
type PaymentStatus = 'Paid' | 'Pending' | 'Failed'
type Order = { id: string; customer: string; initials: string; date: string; time: string; status: OrderStatus; total: string; payment: PaymentStatus; tone: string }

const customers = [['John Doe', 'JD'], ['Sarah Miller', 'SM'], ['Robert Johnson', 'RJ'], ['Emma Wilson', 'EM'], ['David Lee', 'DL'], ['Alice Brown', 'AL'], ['Michael King', 'MK'], ['Daniel White', 'DW'], ['Charlotte Martin', 'CM'], ['Henry Lee', 'HL'], ['Amelia Clark', 'AC'], ['Alexander Lewis', 'AL'], ['Mia Thompson', 'MT'], ['Sebastian Young', 'SY'], ['Olivia Harris', 'OH'], ['James Walker', 'JW'], ['Sophia Hall', 'SH'], ['Ethan Scott', 'ES'], ['Isabella Moore', 'IM'], ['Lucas Allen', 'LA'], ['Grace King', 'GK'], ['Noah Wright', 'NW'], ['Ava Green', 'AG'], ['Benjamin Cole', 'BC'], ['Lily Adams', 'LA'], ['William Ross', 'WR'], ['Chloe Baker', 'CB'], ['Leo Turner', 'LT']] as const
const statuses: OrderStatus[] = ['Completed', 'Processing', 'Completed', 'Cancelled', 'Processing', 'Completed', 'Processing']
const payments: PaymentStatus[] = ['Paid', 'Pending', 'Paid', 'Failed', 'Pending', 'Paid', 'Pending']
const tones = ['violet', 'blue', 'green', 'purple', 'orange', 'teal', 'pink']
const totals = ['$1,299.00', '$799.00', '$2,199.00', '$499.00', '$1,699.00', '$899.00', '$1,099.00']
const orderTimes = ['10:30 AM', '09:15 AM', '04:45 PM', '02:20 PM', '11:05 AM', '06:10 PM', '01:45 PM']
const orders: Order[] = customers.map(([customer, initials], index) => ({ id: `#ORD-${String(index + 1).padStart(4, '0')}`, customer, initials, date: `May ${10 - Math.floor(index / 4)}, 2025`, time: orderTimes[index % 7], status: statuses[index % 7], total: totals[index % 7], payment: payments[index % 7], tone: tones[index % 7] }))
const tabs: Array<'All Orders' | OrderStatus> = ['All Orders', 'Completed', 'Processing', 'Cancelled']

export default function Typography() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('All Orders')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const filtered = useMemo(() => orders.filter((order) => (tab === 'All Orders' || order.status === tab) && `${order.id} ${order.customer}`.toLowerCase().includes(query.toLowerCase())), [query, tab])
  const pageCount = Math.max(1, Math.ceil(filtered.length / 7))
  const currentPage = Math.min(page, pageCount)
  const current = filtered.slice((currentPage - 1) * 7, currentPage * 7)
  const pageItems = Array.from({ length: pageCount }, (_, index) => index + 1)
  const changeTab = (next: (typeof tabs)[number]) => { setTab(next); setPage(1) }

  useEffect(() => {
    if (!selectedOrder) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedOrder(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [selectedOrder])

  return <main className="dashboard-shell">
    <Sidebar />
    <section className="main-area typography-area orders-area">
      <Navbar title="Orders" />
      <div className="typography-content orders-content">
        <section className="orders-card">
          <div className="orders-toolbar">
            <div className="order-tabs" role="tablist" aria-label="Order status">{tabs.map((item) => 
              <button type="button" role="tab" aria-selected={tab === item} key={item} className={tab === item ? 'active' : ''} onClick={() => changeTab(item)}>{item}</button>
            )}
          </div>
          <div className="orders-tools">
            <label className="orders-search">
              <Search />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search orders..." />
            </label>
            <button type="button" className="orders-filter">
              <Filter />Filter
            </button>
          </div>
        </div>
        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{current.map((order) => 
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <div className="order-customer">
                    <span className={`customer-avatar ${order.tone}`}>{order.initials}</span>
                    <strong>{order.customer}</strong>
                  </div>
                </td>
                <td>
                  <strong>{order.date}</strong>
                  <small>{order.time}</small>
                </td>
                <td>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
                <td>
                  <span className={`payment-status ${order.payment.toLowerCase()}`}><i />{order.payment === 'Paid' ? order.total : order.payment}</span>
                </td>
                <td>
                  <div className="order-actions">
                    <button aria-label={`View ${order.id}`} onClick={() => setSelectedOrder(order)}><Eye /></button>
                    <button aria-label={`Ship ${order.id}`}><Truck /></button>
                    <button aria-label={`Invoice ${order.id}`}><FileText /></button>
                  </div>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <footer className="orders-pagination"><p>Showing {(currentPage - 1) * 7 + 1} to {Math.min(currentPage * 7, filtered.length)} of {filtered.length} results</p><div><button aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft /></button>{pageItems.map((item) => <button key={item} className={item === currentPage ? 'active' : ''} onClick={() => setPage(item)}>{item}</button>)}<button aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}><ChevronRight /></button></div></footer></section></div>
         <div className={`order-drawer-layer${selectedOrder ? ' is-open' : ''}`} aria-hidden={!selectedOrder}>
           <button className="order-drawer-backdrop" type="button" aria-label="Close order details" onClick={() => setSelectedOrder(null)} />
           {selectedOrder && <aside className="order-drawer" role="dialog" aria-modal="true" aria-labelledby="order-drawer-title">
           <header className="order-drawer-header">
             <div><p>Order details</p><h2 id="order-drawer-title">{selectedOrder.id}</h2></div>
             <button type="button" aria-label="Close order details" onClick={() => setSelectedOrder(null)}><X /></button>
            </header>
            <div className="order-drawer-content">
             <div className="order-drawer-customer">
              <span className={`customer-avatar ${selectedOrder.tone}`}>{selectedOrder.initials}</span>
              <div><span>Customer</span><strong>{selectedOrder.customer}</strong></div>
            </div>
            <dl className="order-detail-list">
              <div><dt>Order ID</dt><dd>{selectedOrder.id}</dd></div>
              <div><dt>Date &amp; time</dt><dd>{selectedOrder.date} at {selectedOrder.time}</dd></div>
              <div><dt>Order status</dt><dd><span className={`order-status ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></dd></div>
              <div><dt>Payment status</dt><dd><span className={`payment-status ${selectedOrder.payment.toLowerCase()}`}><i />{selectedOrder.payment}</span></dd></div>
              <div><dt>Order total</dt><dd>{selectedOrder.total}</dd></div>
              <div><dt>Payment amount</dt><dd>{selectedOrder.payment === 'Paid' ? selectedOrder.total : 'Not yet paid'}</dd></div>
            </dl>
          </div>
        </aside>}
      </div>
    </section>
  </main>
}