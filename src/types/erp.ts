export type UserRole =
  | 'Super Admin'
  | 'Admin'
  | 'Manager'
  | 'Sales'
  | 'Project Manager'
  | 'Developer'
  | 'HR'
  | 'Accounts'
  | 'Support'
  | 'Employee';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  departmentId: string;
  employeeId: string;
}

export type LeadSource =
  | 'Website'
  | 'WhatsApp'
  | 'Instagram'
  | 'Facebook'
  | 'Google'
  | 'Referral'
  | 'Cold Calling'
  | 'Email'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Follow-up'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export type FollowUpType =
  | 'Phone Call'
  | 'WhatsApp'
  | 'Email'
  | 'Meeting'
  | 'Video Call'
  | 'Other';

export interface FollowUp {
  id: string;
  leadId: string;
  leadName?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  employeeId: string;
  employeeName: string;
  type: FollowUpType;
  notes: string;
  outcome?: string;
  status: 'Pending' | 'Completed' | 'Overdue';
}

export interface Lead {
  id: string; // e.g. LEAD-101
  name: string;
  company: string;
  phone: string;
  email: string;
  location?: string;
  source: LeadSource;
  interestedService: string;
  serviceRequired?: string;
  leadValue: number;
  estimatedBudget?: number;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  priority: PriorityLevel;
  status: LeadStatus;
  createdDate: string;
  lastContact: string;
  nextFollowUp?: string;
  notes: string;
  convertedCustomerId?: string;
}

export interface Customer {
  id: string; // e.g. CUST-501
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  gstNumber?: string;
  createdAt: string;
  servicesPurchased: string[];
  totalBusinessValue: number;
  status: 'Active' | 'Inactive' | 'VIP';
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  description: string;
  category:
    | 'Web & Tech'
    | 'AI Solutions'
    | 'Digital Marketing'
    | 'Design & Creative'
    | 'Cloud & Maintenance'
    | string;
  basePrice: number;
  pricingType?: 'Fixed' | 'Monthly Retainer' | 'Hourly' | 'Milestone';
  taxPercent?: number;
  discountPercent?: number;
  deliveryTimeline?: string;
  status?: 'Active' | 'Archived';
}

export interface QuotationItem {
  id: string;
  serviceName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
  total: number;
}

export type QuotationStatus =
  | 'Draft'
  | 'Sent'
  | 'Viewed'
  | 'Accepted'
  | 'Rejected'
  | 'Expired';

export interface Quotation {
  id: string; // e.g. QT-2026-001
  customerId: string;
  customerName: string;
  customerCompany: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  validUntil: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  terms: string;
  notes: string;
  status: QuotationStatus;
  associatedProjectId?: string;
}

export type ProjectStatus =
  | 'Planning'
  | 'Active'
  | 'On Hold'
  | 'Testing'
  | 'Client Review'
  | 'Completed'
  | 'Cancelled';

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Project {
  id: string; // e.g. PRJ-401
  name: string;
  customerId: string;
  customerName: string;
  service: string;
  projectManagerId: string;
  projectManagerName: string;
  teamMemberIds: string[];
  startDate: string;
  deadline: string;
  budget: number;
  status: ProjectStatus;
  progress: number; // 0 - 100
  description: string;
  quotationId?: string;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Completed' | 'Blocked';

export interface TaskComment {
  id: string;
  authorName: string;
  date: string;
  content: string;
}

export interface Task {
  id: string; // e.g. TSK-1001
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  priority: PriorityLevel;
  startDate: string;
  deadline: string;
  status: TaskStatus;
  progress: number;
  comments: TaskComment[];
}

export interface Timesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
  taskId?: string;
  date: string;
  hours: number;
  description: string;
  isBillable: boolean;
}

export interface Department {
  id: string;
  name: string;
  headName: string;
  employeeCount: number;
}

export interface Employee {
  id: string; // e.g. EMP-01
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  role: UserRole;
  status: 'Active' | 'On Leave' | 'Terminated';
  monthlySalary: number;
  salary?: number; // Convenient alias
  avatar: string;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Half Day' | 'On Leave' | 'Leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkIn?: string; // HH:mm:ss
  checkOut?: string;
  clockIn?: string;
  clockOut?: string;
  status: AttendanceStatus;
  workHours?: number;
}

export type LeaveType = 'Casual' | 'Sick' | 'Paid' | 'Unpaid' | 'Earned' | 'Maternity/Paternity';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  approverName?: string;
  approvalDate?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending';
  paidDate: string;
}

export type InvoiceStatus =
  | 'Draft'
  | 'Sent'
  | 'Partially Paid'
  | 'Paid'
  | 'Overdue'
  | 'Cancelled';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string; // e.g. INV-2026-101
  quotationId?: string;
  projectId?: string;
  projectName?: string;
  customerId: string;
  customerName: string;
  customerCompany: string;
  customerEmail: string;
  customerAddress: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  taxAmount?: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  status: InvoiceStatus;
  paymentInstructions: string;
  terms: string;
}

export interface Payment {
  id: string; // e.g. PAY-901
  invoiceId: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'Bank Transfer' | 'UPI / GPay' | 'Card' | 'Cheque' | 'Cash';
  referenceNumber: string;
  notes?: string;
}

export type ExpenseCategory =
  | 'Salaries'
  | 'Cloud & Servers'
  | 'Marketing & Ads'
  | 'Software Licenses'
  | 'Office & Utilities'
  | 'Travel'
  | 'Hardware'
  | 'Miscellaneous'
  | 'Office Rent'
  | 'Infrastructure'
  | 'Freelance Devs'
  | 'Client Entertainment';

export interface Expense {
  id: string;
  title?: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  employeeId?: string;
  employeeName?: string;
  vendorId?: string;
  vendorName?: string;
  vendor?: string;
  paymentMethod?: string;
  projectId?: string;
  description: string;
  receiptUrl?: string;
}

export interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  amount: number;
  category: string;
  date: string;
  referenceId: string; // Invoice ID or Expense ID
  partyName: string;
  paymentMethod: string;
}

export interface SalesTarget {
  id: string;
  employeeId: string;
  employeeName: string;
  period: 'Monthly' | 'Quarterly' | 'Yearly';
  year: number;
  monthOrQuarter: string;
  targetAmount: number;
  achievedAmount: number;
}

export interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  category: 'Laptops' | 'Networking' | 'Software Licenses' | 'Office Assets' | 'Peripherals';
  quantity: number;
  warehouse: string;
  purchasePrice: number;
  sellingPrice: number;
  minAlertQty: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'In' | 'Out' | 'Adjustment';
  quantity: number;
  date: string;
  reason: string;
  performedBy: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstNumber?: string;
  servicesSupplied: string;
  status: 'Active' | 'Inactive';
}

export interface PurchaseOrder {
  id: string; // e.g. PO-301
  vendorId: string;
  vendorName: string;
  requestDate: string;
  expectedDate: string;
  status: 'Pending Approval' | 'Approved' | 'Ordered' | 'Received' | 'Paid' | 'Cancelled';
  totalAmount: number;
  itemsDescription: string;
  approvedBy?: string;
}

export type TicketCategory =
  | 'Technical issue'
  | 'Website issue'
  | 'App issue'
  | 'Hosting issue'
  | 'Marketing request'
  | 'Maintenance request'
  | 'General complaint'
  | 'Bug / Issue'
  | 'Change Request'
  | 'New Feature'
  | 'Billing Query'
  | 'General Support';

export type TicketStatus =
  | 'Open'
  | 'Assigned'
  | 'In Progress'
  | 'Waiting for Customer'
  | 'Waiting on Client'
  | 'Resolved'
  | 'Closed';

export interface TicketReply {
  id: string;
  authorName: string;
  content: string;
  date: string;
}

export interface SupportTicket {
  id: string; // e.g. TCK-801
  customerId: string;
  customerName: string;
  customerCompany?: string;
  customerContact?: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: PriorityLevel;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  status: TicketStatus;
  createdDate: string;
  resolution?: string;
  replies?: TicketReply[];
}

export interface ErpDocument {
  id: string;
  title: string;
  category:
    | 'Customer Documents'
    | 'Contracts'
    | 'Quotations'
    | 'Invoices'
    | 'Project Documents'
    | 'Employee Documents'
    | 'Vendor Documents'
    | 'Company Documents';
  fileType: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  relatedEntityName?: string;
  downloadUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'followup' | 'task' | 'project' | 'invoice' | 'payment' | 'leave' | 'ticket';
  timestamp: string;
  read: boolean;
  linkSection?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  record: string;
  date: string;
  time: string;
  previousValue?: string;
  newValue?: string;
}

export interface CommunicationEvent {
  id: string;
  customerId?: string;
  leadId?: string;
  type: 'Call' | 'WhatsApp' | 'Email' | 'Meeting' | 'Note';
  timestamp: string;
  summary: string;
  staffName: string;
}
