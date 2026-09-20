import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Receipt,
  CreditCard,
  Target,
  Plus,
  Search,
  CheckCircle,
  Printer,
  X,
  Building,
  DollarSign,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useErp } from '../../../context/ErpContext';
import { Quotation, Invoice, QuotationStatus, QuotationItem } from '../../../types/erp';

export const SalesView: React.FC = () => {
  const {
    quotations,
    invoices,
    payments,
    salesTargets,
    customers,
    services,
    employees,
    createQuotation,
    updateQuotationStatus,
    acceptQuotationAndCreateProject,
    createInvoice,
    recordPayment,
  } = useErp();

  const [activeTab, setActiveTab] = useState<'quotations' | 'invoices' | 'payments' | 'targets'>('quotations');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isCreateQuoteOpen, setIsCreateQuoteOpen] = useState(false);
  const [isQuotePreviewOpen, setIsQuotePreviewOpen] = useState(false);
  const [selectedQuoteForPreview, setSelectedQuoteForPreview] = useState<Quotation | null>(null);

  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Invoice | null>(null);

  // New Quote Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [quoteItems, setQuoteItems] = useState<QuotationItem[]>([
    {
      id: '1',
      serviceName: services[0]?.name || 'Web Development',
      description: services[0]?.description || 'Custom digital delivery',
      quantity: 1,
      unitPrice: services[0]?.basePrice || 45000,
      discountPercent: 5,
      taxPercent: 18,
      total: 50150,
    },
  ]);
  const [quoteTerms, setQuoteTerms] = useState('50% advance on project kickoff, 50% on live launch signoff.');

  // Payment Form State
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'UPI / GPay' | 'Card' | 'Cheque' | 'Cash'>('Bank Transfer');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');

  // Item Calculations
  const calculateItemTotal = (qty: number, price: number, disc: number, tax: number) => {
    const discounted = price * (1 - disc / 100);
    const withTax = discounted * (1 + tax / 100);
    return Math.round(qty * withTax);
  };

  const handleAddItem = () => {
    const srv = services[0];
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      serviceName: srv?.name || 'Custom Solution',
      description: srv?.description || '',
      quantity: 1,
      unitPrice: srv?.basePrice || 35000,
      discountPercent: 0,
      taxPercent: 18,
      total: Math.round((srv?.basePrice || 35000) * 1.18),
    };
    setQuoteItems([...quoteItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setQuoteItems(quoteItems.filter((i) => i.id !== id));
  };

  const handleItemChange = (index: number, field: keyof QuotationItem, value: any) => {
    const updated = [...quoteItems];
    const item = { ...updated[index], [field]: value };
    item.total = calculateItemTotal(item.quantity, item.unitPrice, item.discountPercent, item.taxPercent);
    updated[index] = item;
    setQuoteItems(updated);
  };

  const quoteSubtotal = quoteItems.reduce((sum, i) => sum + i.quantity * i.unitPrice * (1 - i.discountPercent / 100), 0);
  const quoteGrandTotal = quoteItems.reduce((sum, i) => sum + i.total, 0);
  const quoteTaxAmount = Math.round(quoteGrandTotal - quoteSubtotal);

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === selectedCustomerId) || customers[0];
    const today = new Date().toISOString().slice(0, 10);
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 30);

    const created = createQuotation({
      customerId: cust.id,
      customerName: cust.name,
      customerCompany: cust.company,
      customerEmail: cust.email,
      customerPhone: cust.phone,
      customerAddress: cust.address,
      date: today,
      validUntil: validUntilDate.toISOString().slice(0, 10),
      items: quoteItems,
      subtotal: Math.round(quoteSubtotal),
      taxAmount: quoteTaxAmount,
      discountAmount: 0,
      grandTotal: quoteGrandTotal,
      terms: quoteTerms,
      notes: 'Standard service level agreement applies.',
      status: 'Sent',
    });

    setIsCreateQuoteOpen(false);
    setSelectedQuoteForPreview(created);
    setIsQuotePreviewOpen(true);
  };

  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPayment) return;

    recordPayment({
      invoiceId: selectedInvoiceForPayment.id,
      customerId: selectedInvoiceForPayment.customerId,
      customerName: selectedInvoiceForPayment.customerCompany,
      amount: Number(paymentAmount),
      paymentMethod,
      referenceNumber: referenceNumber || `REF-${Date.now().toString().slice(-6)}`,
      notes: paymentNotes,
    });

    setIsRecordPaymentOpen(false);
    setSelectedInvoiceForPayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Commercial & Sales Operations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create quotations, bill milestone invoices, collect payments, and track sales performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateQuoteOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            New Quotation
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setActiveTab('quotations')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'quotations'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Quotations ({quotations.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'invoices'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Receipt className="w-4 h-4" />
          Invoices & Receivables ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'payments'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Payment History ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('targets')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'targets'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Target className="w-4 h-4" />
          Sales Targets
        </button>
      </div>

      {/* TAB 1: QUOTATIONS */}
      {activeTab === 'quotations' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Quotation #</th>
                  <th className="px-4 py-3.5">Client</th>
                  <th className="px-4 py-3.5">Grand Total (GST Inc.)</th>
                  <th className="px-4 py-3.5">Valid Until</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotations.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 font-mono font-bold text-blue-600">{quote.id}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{quote.customerCompany}</div>
                      <div className="text-xs text-slate-400">{quote.customerName}</div>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      ₹{quote.grandTotal.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">{quote.validUntil}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          quote.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : quote.status === 'Sent'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedQuoteForPreview(quote);
                          setIsQuotePreviewOpen(true);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                      >
                        View & Print
                      </button>
                      {quote.status !== 'Accepted' && (
                        <button
                          onClick={() => {
                            acceptQuotationAndCreateProject(quote.id);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-2xs"
                          title="Accept quote, launch project & issue advance invoice"
                        >
                          Accept & Launch Project
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INVOICES & RECEIVABLES */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Invoice #</th>
                  <th className="px-4 py-3.5">Customer & Project</th>
                  <th className="px-4 py-3.5">Invoice Amount</th>
                  <th className="px-4 py-3.5">Amount Paid</th>
                  <th className="px-4 py-3.5">Balance Due</th>
                  <th className="px-4 py-3.5">Due Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 font-mono font-bold text-slate-900">{inv.id}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{inv.customerCompany}</div>
                      <div className="text-xs text-slate-400 truncate max-w-xs">{inv.projectName || 'General Services'}</div>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      ₹{inv.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-emerald-600 font-semibold">
                      ₹{inv.amountPaid.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      ₹{inv.balanceDue.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">{inv.dueDate}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inv.status === 'Overdue'
                            ? 'bg-rose-100 text-rose-800'
                            : inv.status === 'Partially Paid'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      {inv.balanceDue > 0 && (
                        <button
                          onClick={() => {
                            setSelectedInvoiceForPayment(inv);
                            setPaymentAmount(inv.balanceDue);
                            setIsRecordPaymentOpen(true);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                        >
                          Record Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT HISTORY */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Payment ID</th>
                  <th className="px-4 py-3.5">Invoice #</th>
                  <th className="px-4 py-3.5">Client / Payer</th>
                  <th className="px-4 py-3.5">Amount Received</th>
                  <th className="px-4 py-3.5">Method</th>
                  <th className="px-4 py-3.5">Reference #</th>
                  <th className="px-5 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 font-mono font-bold text-emerald-600">{p.id}</td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-700">{p.invoiceId}</td>
                    <td className="px-4 py-4 font-medium text-slate-900">{p.customerName}</td>
                    <td className="px-4 py-4 font-bold text-emerald-600">
                      ₹{p.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-500">{p.referenceNumber}</td>
                    <td className="px-5 py-4 text-xs text-slate-600">{p.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SALES TARGETS */}
      {activeTab === 'targets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {salesTargets.map((trg) => {
            const pct = Math.min(100, Math.round((trg.achievedAmount / trg.targetAmount) * 100));
            return (
              <div
                key={trg.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{trg.employeeName}</h3>
                    <div className="text-xs text-slate-400">{trg.period} Target • {trg.monthOrQuarter} {trg.year}</div>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{pct}%</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Achieved: ₹{trg.achievedAmount.toLocaleString()}</span>
                    <span className="text-slate-500 font-semibold">Target: ₹{trg.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RECORD PAYMENT MODAL */}
      {isRecordPaymentOpen && selectedInvoiceForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Record Payment Receipt</h3>
                <p className="text-xs text-slate-500">
                  {selectedInvoiceForPayment.id} • {selectedInvoiceForPayment.customerCompany}
                </p>
              </div>
              <button
                onClick={() => setIsRecordPaymentOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount Received (₹) *</label>
                <input
                  type="number"
                  required
                  max={selectedInvoiceForPayment.balanceDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <div className="text-[11px] text-slate-400 mt-1">
                  Remaining balance due: ₹{selectedInvoiceForPayment.balanceDue.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Bank Transfer">Bank Transfer (NEFT / RTGS / IMPS)</option>
                  <option value="UPI / GPay">UPI / Google Pay / PhonePe</option>
                  <option value="Card">Corporate Credit / Debit Card</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Transaction Ref / UTR # *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UTR123456789"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                >
                  Confirm & Update Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE QUOTATION MODAL */}
      {isCreateQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Generate Official Quotation</h3>
                <p className="text-xs text-slate-500">Commercial estimation with GST breakdown</p>
              </div>
              <button
                onClick={() => setIsCreateQuoteOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuotation} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Customer</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.company} ({c.name}) - {c.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Deliverable Line Items</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Service Item
                  </button>
                </div>

                <div className="space-y-3">
                  {quoteItems.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Service Name"
                          value={item.serviceName}
                          onChange={(e) => handleItemChange(idx, 'serviceName', e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        {quoteItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Description of deliverables"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                      />
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400">Qty</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Rate (₹)</label>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Disc (%)</label>
                          <input
                            type="number"
                            value={item.discountPercent}
                            onChange={(e) => handleItemChange(idx, 'discountPercent', Number(e.target.value))}
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Total (Inc. GST)</label>
                          <div className="font-bold text-slate-900 py-1 text-right">
                            ₹{item.total.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Commercial Terms & SLA</label>
                <textarea
                  rows={2}
                  value={quoteTerms}
                  onChange={(e) => setQuoteTerms(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Total Calculation Display */}
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-sm">
                <div>
                  <div className="text-xs text-slate-500">Subtotal: ₹{Math.round(quoteSubtotal).toLocaleString()}</div>
                  <div className="text-xs text-slate-500">GST (18%): ₹{quoteTaxAmount.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600 font-semibold">Grand Total</div>
                  <div className="text-xl font-bold text-slate-900">₹{quoteGrandTotal.toLocaleString()}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateQuoteOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                >
                  Generate & Preview Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE / PREVIEW QUOTATION MODAL */}
      {isQuotePreviewOpen && selectedQuoteForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
            {/* Action Bar */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="font-semibold text-sm">Commercial Proposal: {selectedQuoteForPreview.id}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-4 h-4" /> Print / PDF
                </button>
                <button
                  onClick={() => setIsQuotePreviewOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-8 overflow-y-auto bg-white text-slate-800 space-y-6">
              {/* Header with Company Logo */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                <div>
                  <img src="/assets/img/logo/logo-1.png" alt="DDS Expo" className="h-10 w-auto mb-2" />
                  <div className="text-xs text-slate-500">
                    DDS Expo Technologies Pvt Ltd<br />
                    100% AI-Driven Digital Marketing & IT Solutions<br />
                    Visakhapatnam, Andhra Pradesh, India<br />
                    Email: contact@ddsexpo.com • Phone: +91 9966994679
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">QUOTATION</h2>
                  <div className="text-xs font-mono text-slate-500 mt-1">Ref: {selectedQuoteForPreview.id}</div>
                  <div className="text-xs text-slate-500">Date: {selectedQuoteForPreview.date}</div>
                  <div className="text-xs text-slate-500">Valid Until: {selectedQuoteForPreview.validUntil}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prepared For:</div>
                <div className="text-sm font-bold text-slate-900">{selectedQuoteForPreview.customerCompany}</div>
                <div className="text-xs text-slate-600">{selectedQuoteForPreview.customerName}</div>
                <div className="text-xs text-slate-500">{selectedQuoteForPreview.customerAddress}</div>
                <div className="text-xs text-slate-500">{selectedQuoteForPreview.customerEmail} • {selectedQuoteForPreview.customerPhone}</div>
              </div>

              {/* Items */}
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Scope & Service Item</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">GST</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedQuoteForPreview.items.map((it, idx) => (
                    <tr key={it.id}>
                      <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{it.serviceName}</div>
                        <div className="text-slate-500 mt-0.5">{it.description}</div>
                      </td>
                      <td className="p-3 text-center">{it.quantity}</td>
                      <td className="p-3 text-right">₹{it.unitPrice.toLocaleString()}</td>
                      <td className="p-3 text-right">{it.taxPercent}%</td>
                      <td className="p-3 text-right font-bold text-slate-900">₹{it.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Grand Total Breakdown */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>₹{selectedQuoteForPreview.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18%):</span>
                    <span>₹{selectedQuoteForPreview.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-blue-600">₹{selectedQuoteForPreview.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                <div className="font-bold text-slate-700 mb-1">Commercial Terms:</div>
                <p>{selectedQuoteForPreview.terms}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
