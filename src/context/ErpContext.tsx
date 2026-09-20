import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserAccount,
  UserRole,
  Department,
  Employee,
  Lead,
  FollowUp,
  Customer,
  ServiceCatalogItem,
  Quotation,
  Project,
  Milestone,
  Task,
  Timesheet,
  Invoice,
  Payment,
  Expense,
  Transaction,
  SalesTarget,
  InventoryProduct,
  StockMovement,
  Vendor,
  PurchaseOrder,
  SupportTicket,
  ErpDocument,
  NotificationItem,
  AuditLog,
  CommunicationEvent,
  AttendanceRecord,
  AttendanceStatus,
  LeaveRequest,
  LeaveStatus,
  PayrollRecord,
  TicketStatus,
} from '../types/erp';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_EMPLOYEES,
  INITIAL_SERVICES,
  INITIAL_CUSTOMERS,
  INITIAL_LEADS,
  INITIAL_FOLLOWUPS,
  INITIAL_QUOTATIONS,
  INITIAL_PROJECTS,
  INITIAL_MILESTONES,
  INITIAL_TASKS,
  INITIAL_TIMESHEETS,
  INITIAL_INVOICES,
  INITIAL_PAYMENTS,
  INITIAL_EXPENSES,
  INITIAL_TRANSACTIONS,
  INITIAL_SALES_TARGETS,
  INITIAL_INVENTORY,
  INITIAL_STOCK_MOVEMENTS,
  INITIAL_VENDORS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_DOCUMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COMMUNICATIONS,
} from './initialData';

interface ErpContextType {
  // Current user & authentication
  currentUser: UserAccount;
  allUsers: UserAccount[];
  setCurrentUser: (user: UserAccount) => void;
  hasPermission: (module: string) => boolean;

  // View state
  activeModule: string;
  setActiveModule: (module: string) => void;
  isPortalOpen: boolean;
  setIsPortalOpen: (open: boolean) => void;

  // Core entities
  departments: Department[];
  employees: Employee[];
  services: ServiceCatalogItem[];
  customers: Customer[];
  leads: Lead[];
  followUps: FollowUp[];
  quotations: Quotation[];
  projects: Project[];
  milestones: Milestone[];
  tasks: Task[];
  timesheets: Timesheet[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  transactions: Transaction[];
  salesTargets: SalesTarget[];
  inventory: InventoryProduct[];
  stockMovements: StockMovement[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  supportTickets: SupportTicket[];
  documents: ErpDocument[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  communications: CommunicationEvent[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  payroll: PayrollRecord[];
  setCurrentUserRole: (role: UserRole) => void;
  markAttendance: (employeeId: string, status: AttendanceStatus, inTime?: string, outTime?: string) => void;
  applyLeave: (req: any) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  createTicket: (ticket: any) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  addTicketReply: (ticketId: string, content: string) => void;

  // Actions
  addLead: (lead: Partial<Lead> & { name: string; email: string; phone: string }) => Lead;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  convertLeadToCustomer: (leadId: string) => Customer;
  addFollowUp: (followUp: Omit<FollowUp, 'id' | 'status'>) => void;
  completeFollowUp: (followUpId: string, outcome: string) => void;

  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalBusinessValue'>) => Customer;

  createQuotation: (quotation: Omit<Quotation, 'id'>) => Quotation;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;
  acceptQuotationAndCreateProject: (quotationId: string) => Project;

  createProject: (project: Omit<Project, 'id' | 'progress'>) => Project;
  updateProjectStatus: (projectId: string, status: Project['status']) => void;

  createTask: (task: Omit<Task, 'id' | 'comments'>) => Task;
  updateTaskStatus: (taskId: string, status: Task['status'], progress?: number) => void;
  addTaskComment: (taskId: string, comment: string) => void;

  logTimesheet: (timesheet: Omit<Timesheet, 'id'>) => void;

  createInvoice: (invoice: Omit<Invoice, 'id' | 'amountPaid' | 'balanceDue' | 'status'>) => Invoice;
  recordPayment: (payment: Omit<Payment, 'id' | 'paymentDate'>) => void;

  addExpense: (expense: Omit<Expense, 'id'>) => void;

  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  recordCheckIn: (employeeId: string) => void;
  recordCheckOut: (employeeId: string) => void;
  submitLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'status'>) => void;
  handleLeaveAction: (requestId: string, approve: boolean) => void;

  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdDate'>) => SupportTicket;
  resolveTicket: (ticketId: string, resolution: string) => void;

  addDocument: (doc: Omit<ErpDocument, 'id' | 'uploadDate'>) => void;
  deleteDocument: (docId: string) => void;

  createPurchaseOrder: (po: Omit<PurchaseOrder, 'id' | 'status'>) => void;
  updatePurchaseOrderStatus: (poId: string, status: PurchaseOrder['status']) => void;

  addInventoryProduct: (product: Omit<InventoryProduct, 'id'>) => void;
  recordStockMovement: (movement: Omit<StockMovement, 'id' | 'date'>) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  addAuditLog: (action: string, module: string, record: string, prev?: string, next?: string) => void;
  resetAllData: () => void;
}

const ErpContext = createContext<ErpContextType | null>(null);

const STORAGE_KEY = 'dds_expo_erp_v1';

export const ErpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Active module & portal display
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  // Active logged-in user simulation
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]);
  const [allUsers] = useState<UserAccount[]>(INITIAL_USERS);

  // State slices initialized from LocalStorage or seed data
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_departments`);
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_employees`);
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [services, setServices] = useState<ServiceCatalogItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_leads`);
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_followups`);
    return saved ? JSON.parse(saved) : INITIAL_FOLLOWUPS;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_quotations`);
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_milestones`);
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [timesheets, setTimesheets] = useState<Timesheet[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_timesheets`);
    return saved ? JSON.parse(saved) : INITIAL_TIMESHEETS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_expenses`);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [salesTargets, setSalesTargets] = useState<SalesTarget[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_sales_targets`);
    return saved ? JSON.parse(saved) : INITIAL_SALES_TARGETS;
  });

  const [inventory, setInventory] = useState<InventoryProduct[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inventory`);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stock_movements`);
    return saved ? JSON.parse(saved) : INITIAL_STOCK_MOVEMENTS;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_vendors`);
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_purchase_orders`);
    return saved ? JSON.parse(saved) : INITIAL_PURCHASE_ORDERS;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tickets`);
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_TICKETS;
  });

  const [documents, setDocuments] = useState<ErpDocument[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_documents`);
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit_logs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [communications, setCommunications] = useState<CommunicationEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_communications`);
    return saved ? JSON.parse(saved) : INITIAL_COMMUNICATIONS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_attendance`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'ATT-01',
        employeeId: 'EMP-01',
        employeeName: 'Mr. Dhanunjay',
        date: new Date().toISOString().slice(0, 10),
        checkIn: '08:50:12',
        status: 'Present',
        workHours: 8.5,
      },
      {
        id: 'ATT-02',
        employeeId: 'EMP-03',
        employeeName: 'Mr. Srikanth',
        date: new Date().toISOString().slice(0, 10),
        checkIn: '09:05:00',
        status: 'Present',
        workHours: 8.0,
      },
      {
        id: 'ATT-03',
        employeeId: 'EMP-04',
        employeeName: 'Mr. Sanjay Kumar',
        date: new Date().toISOString().slice(0, 10),
        checkIn: '09:12:44',
        status: 'Present',
        workHours: 7.8,
      },
    ];
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_leaves`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'LEV-01',
        employeeId: 'EMP-05',
        employeeName: 'Alex Rivera',
        leaveType: 'Casual',
        startDate: '2026-09-24',
        endDate: '2026-09-25',
        days: 2,
        reason: 'Family wedding event in hometown.',
        status: 'Pending',
      },
      {
        id: 'LEV-02',
        employeeId: 'EMP-07',
        employeeName: 'Kiran Varma',
        leaveType: 'Sick',
        startDate: '2026-09-02',
        endDate: '2026-09-03',
        days: 2,
        reason: 'Viral fever rest as prescribed by doctor.',
        status: 'Approved',
        approverName: 'Mrs. Rama Devi',
        approvalDate: '2026-09-02',
      },
    ];
  });

  const [payroll, setPayroll] = useState<PayrollRecord[]>([
    {
      id: 'PAY-2026-08-01',
      employeeId: 'EMP-01',
      employeeName: 'Mr. Dhanunjay',
      month: 'August',
      year: 2026,
      baseSalary: 120000,
      bonus: 25000,
      deductions: 0,
      netSalary: 145000,
      status: 'Paid',
      paidDate: '2026-09-01',
    },
    {
      id: 'PAY-2026-08-02',
      employeeId: 'EMP-03',
      employeeName: 'Mr. Srikanth',
      month: 'August',
      year: 2026,
      baseSalary: 65000,
      bonus: 10000,
      deductions: 0,
      netSalary: 75000,
      status: 'Paid',
      paidDate: '2026-09-01',
    },
    {
      id: 'PAY-2026-08-03',
      employeeId: 'EMP-04',
      employeeName: 'Mr. Sanjay Kumar',
      month: 'August',
      year: 2026,
      baseSalary: 45000,
      bonus: 15000,
      deductions: 1500,
      netSalary: 58500,
      status: 'Paid',
      paidDate: '2026-09-01',
    },
    {
      id: 'PAY-2026-08-04',
      employeeId: 'EMP-05',
      employeeName: 'Priya Sharma',
      month: 'August',
      year: 2026,
      baseSalary: 50000,
      bonus: 5000,
      deductions: 0,
      netSalary: 55000,
      status: 'Paid',
      paidDate: '2026-09-01',
    },
  ]);

  const setCurrentUserRole = (role: UserRole) => {
    const existing = allUsers.find((u) => u.role === role);
    if (existing) {
      setCurrentUser(existing);
    } else {
      setCurrentUser((prev) => ({ ...prev, role }));
    }
  };

  const markAttendance = (employeeId: string, status: AttendanceStatus, inTime?: string, outTime?: string) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const emp = employees.find((e) => e.id === employeeId);
    setAttendance((prev) => {
      const idx = prev.findIndex((a) => a.employeeId === employeeId && a.date === todayStr);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          status,
          clockIn: inTime || updated[idx].clockIn || updated[idx].checkIn,
          clockOut: outTime || updated[idx].clockOut,
          checkIn: inTime || updated[idx].checkIn,
          checkOut: outTime || updated[idx].checkOut,
        };
        return updated;
      } else {
        return [
          {
            id: `ATT-${Date.now().toString().slice(-4)}`,
            employeeId,
            employeeName: emp ? emp.name : 'Employee',
            date: todayStr,
            status,
            clockIn: inTime,
            clockOut: outTime,
            checkIn: inTime,
            checkOut: outTime,
          },
          ...prev,
        ];
      }
    });
  };

  const applyLeave = (req: any) => {
    submitLeaveRequest(req);
  };

  const approveLeave = (id: string) => {
    handleLeaveAction(id, true);
  };

  const rejectLeave = (id: string) => {
    handleLeaveAction(id, false);
  };

  const createTicket = (ticket: any) => {
    return createSupportTicket(ticket);
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const addTicketReply = (ticketId: string, content: string) => {
    const reply = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      authorName: currentUser.name,
      content,
      date: new Date().toISOString().slice(0, 10),
    };
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const replies = t.replies || [];
          return { ...t, replies: [...replies, reply] };
        }
        return t;
      })
    );
  };

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_departments`, JSON.stringify(departments));
    localStorage.setItem(`${STORAGE_KEY}_employees`, JSON.stringify(employees));
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
    localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
    localStorage.setItem(`${STORAGE_KEY}_followups`, JSON.stringify(followUps));
    localStorage.setItem(`${STORAGE_KEY}_quotations`, JSON.stringify(quotations));
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    localStorage.setItem(`${STORAGE_KEY}_milestones`, JSON.stringify(milestones));
    localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
    localStorage.setItem(`${STORAGE_KEY}_timesheets`, JSON.stringify(timesheets));
    localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
    localStorage.setItem(`${STORAGE_KEY}_payments`, JSON.stringify(payments));
    localStorage.setItem(`${STORAGE_KEY}_expenses`, JSON.stringify(expenses));
    localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
    localStorage.setItem(`${STORAGE_KEY}_sales_targets`, JSON.stringify(salesTargets));
    localStorage.setItem(`${STORAGE_KEY}_inventory`, JSON.stringify(inventory));
    localStorage.setItem(`${STORAGE_KEY}_stock_movements`, JSON.stringify(stockMovements));
    localStorage.setItem(`${STORAGE_KEY}_vendors`, JSON.stringify(vendors));
    localStorage.setItem(`${STORAGE_KEY}_purchase_orders`, JSON.stringify(purchaseOrders));
    localStorage.setItem(`${STORAGE_KEY}_tickets`, JSON.stringify(supportTickets));
    localStorage.setItem(`${STORAGE_KEY}_documents`, JSON.stringify(documents));
    localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    localStorage.setItem(`${STORAGE_KEY}_audit_logs`, JSON.stringify(auditLogs));
    localStorage.setItem(`${STORAGE_KEY}_communications`, JSON.stringify(communications));
    localStorage.setItem(`${STORAGE_KEY}_attendance`, JSON.stringify(attendance));
    localStorage.setItem(`${STORAGE_KEY}_leaves`, JSON.stringify(leaveRequests));
  }, [
    departments,
    employees,
    services,
    customers,
    leads,
    followUps,
    quotations,
    projects,
    milestones,
    tasks,
    timesheets,
    invoices,
    payments,
    expenses,
    transactions,
    salesTargets,
    inventory,
    stockMovements,
    vendors,
    purchaseOrders,
    supportTickets,
    documents,
    notifications,
    auditLogs,
    communications,
    attendance,
    leaveRequests,
  ]);

  // Role-based Access Control
  const hasPermission = (module: string): boolean => {
    const role = currentUser.role;
    if (role === 'Super Admin' || role === 'Admin') return true;

    switch (module) {
      case 'dashboard':
        return true;
      case 'crm':
      case 'crm-leads':
      case 'crm-customers':
      case 'crm-followups':
      case 'crm-pipeline':
        return ['Sales', 'Manager'].includes(role);
      case 'sales':
      case 'sales-quotations':
      case 'sales-orders':
      case 'sales-targets':
        return ['Sales', 'Manager', 'Accounts'].includes(role);
      case 'sales-invoices':
      case 'sales-payments':
        return ['Sales', 'Accounts', 'Manager'].includes(role);
      case 'projects':
      case 'projects-list':
      case 'projects-tasks':
      case 'projects-milestones':
      case 'projects-timesheets':
        return ['Manager', 'Developer', 'Sales', 'Support', 'Employee'].includes(role);
      case 'hrms':
      case 'hrms-employees':
      case 'hrms-departments':
      case 'hrms-leaves':
        return ['HR', 'Manager'].includes(role);
      case 'hrms-attendance':
        return true; // Everyone can clock in/out
      case 'finance':
      case 'finance-income':
      case 'finance-expenses':
      case 'finance-receivables':
      case 'finance-payables':
      case 'finance-transactions':
        return ['Accounts'].includes(role);
      case 'inventory':
        return ['Manager', 'Accounts', 'Support'].includes(role);
      case 'purchasing':
        return ['Manager', 'Accounts'].includes(role);
      case 'support':
        return ['Support', 'Manager', 'Developer'].includes(role);
      case 'documents':
        return true;
      case 'reports':
        return ['Manager', 'Accounts', 'HR', 'Sales'].includes(role);
      case 'ai-assistant':
        return true;
      case 'audit-logs':
      case 'settings':
        return ['Super Admin', 'Admin'].includes(role);
      default:
        return true;
    }
  };

  const addAuditLog = (action: string, module: string, record: string, prev?: string, next?: string) => {
    const now = new Date();
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      user: currentUser.name,
      role: currentUser.role,
      action,
      module,
      record,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 8),
      previousValue: prev,
      newValue: next,
    };
    setAuditLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  // Add Lead
  const addLead = (leadData: Partial<Lead> & { name: string; email: string; phone: string }): Lead => {
    const newId = `LEAD-${100 + leads.length + 1}`;
    const today = new Date().toISOString().slice(0, 10);
    const newLead: Lead = {
      location: 'Hyderabad, India',
      source: 'Website',
      interestedService: 'AI Digital Solutions',
      serviceRequired: 'AI Digital Solutions',
      leadValue: 35000,
      estimatedBudget: 35000,
      assignedEmployeeId: 'EMP-04',
      assignedEmployeeName: 'Mr. Sanjay Kumar',
      priority: 'Medium',
      status: 'New',
      notes: '',
      ...leadData,
      id: newId,
      name: leadData.name,
      company: leadData.company || `${leadData.name}'s Enterprise`,
      phone: leadData.phone,
      email: leadData.email,
      createdDate: today,
      lastContact: today,
    };

    setLeads((prev) => [newLead, ...prev]);

    // Create a follow-up automatically if nextFollowUp specified
    if (leadData.nextFollowUp) {
      const followUp: FollowUp = {
        id: `FLP-${Date.now().toString().slice(-4)}`,
        leadId: newId,
        leadName: `${newLead.name} (${newLead.company || 'Client'})`,
        date: leadData.nextFollowUp,
        time: '11:00',
        employeeId: newLead.assignedEmployeeId || 'EMP-04',
        employeeName: newLead.assignedEmployeeName || 'Mr. Sanjay Kumar',
        type: 'Phone Call',
        notes: `Initial follow-up for ${newLead.interestedService}`,
        status: 'Pending',
      };
      setFollowUps((prev) => [followUp, ...prev]);
    }

    // Trigger Notification
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Lead Registered',
      message: `${newLead.name} (${newLead.company}) registered for ${newLead.interestedService}`,
      type: 'lead',
      timestamp: 'Just now',
      read: false,
      linkSection: 'crm-leads',
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('Created Lead', 'CRM', `${newId} (${newLead.name})`, undefined, `Status: ${newLead.status}`);
    return newLead;
  };

  // Update Lead Status
  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          addAuditLog('Updated Lead Status', 'CRM', l.name, `Status: ${l.status}`, `Status: ${status}`);
          return { ...l, status, lastContact: new Date().toISOString().slice(0, 10) };
        }
        return l;
      })
    );
  };

  // Convert Lead to Customer
  const convertLeadToCustomer = (leadId: string): Customer => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    const customerId = `CUST-${500 + customers.length + 1}`;
    const newCustomer: Customer = {
      id: customerId,
      name: lead.name,
      company: lead.company || lead.name,
      phone: lead.phone,
      email: lead.email,
      address: lead.location || 'Visakhapatnam, AP',
      createdAt: new Date().toISOString().slice(0, 10),
      servicesPurchased: [lead.interestedService],
      totalBusinessValue: lead.leadValue || 0,
      status: 'Active',
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'Won', convertedCustomerId: customerId } : l))
    );

    addAuditLog(
      'Converted Lead to Customer',
      'CRM',
      `${lead.id} -> ${customerId}`,
      `Lead: ${lead.name}`,
      `Customer created: ${newCustomer.company}`
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Lead Converted to Customer!',
      message: `${newCustomer.name} (${newCustomer.company}) is now an active client.`,
      type: 'lead',
      timestamp: 'Just now',
      read: false,
      linkSection: 'crm-customers',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newCustomer;
  };

  // Add Customer
  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalBusinessValue'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `CUST-${500 + customers.length + 1}`,
      createdAt: new Date().toISOString().slice(0, 10),
      totalBusinessValue: 0,
    };
    setCustomers((prev) => [newCust, ...prev]);
    addAuditLog('Created Customer', 'CRM', `${newCust.id} (${newCust.company})`);
    return newCust;
  };

  // Add FollowUp
  const addFollowUp = (followUpData: Omit<FollowUp, 'id' | 'status'>) => {
    const newFollowUp: FollowUp = {
      ...followUpData,
      id: `FLP-${Date.now().toString().slice(-4)}`,
      status: 'Pending',
    };
    setFollowUps((prev) => [newFollowUp, ...prev]);
    // update lead's nextFollowUp
    setLeads((prev) =>
      prev.map((l) => (l.id === followUpData.leadId ? { ...l, nextFollowUp: followUpData.date } : l))
    );
    addAuditLog('Scheduled Follow-up', 'CRM', `${followUpData.leadName} on ${followUpData.date}`);
  };

  const completeFollowUp = (followUpId: string, outcome: string) => {
    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id === followUpId) {
          return { ...f, status: 'Completed', outcome };
        }
        return f;
      })
    );
  };

  // Create Quotation
  const createQuotation = (quotationData: Omit<Quotation, 'id'>): Quotation => {
    const newId = `QT-2026-00${quotations.length + 1}`;
    const newQuotation: Quotation = {
      ...quotationData,
      id: newId,
    };
    setQuotations((prev) => [newQuotation, ...prev]);
    addAuditLog('Generated Quotation', 'Sales', `${newId} for ${newQuotation.customerCompany}`, undefined, `Total: ₹${newQuotation.grandTotal}`);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Quotation Generated',
      message: `Quotation ${newId} (₹${newQuotation.grandTotal.toLocaleString()}) created for ${newQuotation.customerCompany}.`,
      type: 'project',
      timestamp: 'Just now',
      read: false,
      linkSection: 'sales-quotations',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newQuotation;
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          addAuditLog('Updated Quotation Status', 'Sales', q.id, `Status: ${q.status}`, `Status: ${status}`);
          return { ...q, status };
        }
        return q;
      })
    );
  };

  // Accept Quotation and automatically create Project
  const acceptQuotationAndCreateProject = (quotationId: string): Project => {
    const quote = quotations.find((q) => q.id === quotationId);
    if (!quote) throw new Error('Quotation not found');

    const projectId = `PRJ-${400 + projects.length + 1}`;
    const today = new Date().toISOString().slice(0, 10);
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 30);
    const deadline = deadlineDate.toISOString().slice(0, 10);

    const firstItem = quote.items[0];
    const serviceName = firstItem ? firstItem.serviceName : 'Digital IT Services';

    const newProject: Project = {
      id: projectId,
      name: `${quote.customerCompany} - ${serviceName}`,
      customerId: quote.customerId,
      customerName: `${quote.customerName} (${quote.customerCompany})`,
      service: serviceName,
      projectManagerId: 'EMP-03',
      projectManagerName: 'Mr. Srikanth',
      teamMemberIds: ['EMP-03', 'EMP-05'],
      startDate: today,
      deadline,
      budget: quote.grandTotal,
      status: 'Active',
      progress: 10,
      description: `Delivery of approved quotation ${quote.id}. Scope includes: ${quote.items.map((i) => i.serviceName).join(', ')}.`,
      quotationId: quote.id,
    };

    setProjects((prev) => [newProject, ...prev]);

    // Update quote status
    setQuotations((prev) =>
      prev.map((q) => (q.id === quotationId ? { ...q, status: 'Accepted', associatedProjectId: projectId } : q))
    );

    // Auto-create initial project tasks
    const initialTask1: Task = {
      id: `TSK-${1000 + tasks.length + 1}`,
      title: 'Project Kickoff & Scope Validation',
      description: `Kickoff meeting with ${quote.customerName} and setup development repositories.`,
      projectId,
      projectName: newProject.name,
      assignedEmployeeId: 'EMP-03',
      assignedEmployeeName: 'Mr. Srikanth',
      priority: 'High',
      startDate: today,
      deadline: today,
      status: 'Completed',
      progress: 100,
      comments: [],
    };

    const initialTask2: Task = {
      id: `TSK-${1000 + tasks.length + 2}`,
      title: 'Architecture & Design Assets Delivery',
      description: 'Prepare initial wireframes, brand vectors, and staging environment infrastructure.',
      projectId,
      projectName: newProject.name,
      assignedEmployeeId: 'EMP-05',
      assignedEmployeeName: 'Alex Rivera',
      priority: 'High',
      startDate: today,
      deadline,
      status: 'In Progress',
      progress: 25,
      comments: [],
    };

    setTasks((prev) => [initialTask1, initialTask2, ...prev]);

    // Auto-create Initial Advance Invoice (50%)
    const advanceAmount = Math.round(quote.grandTotal * 0.5);
    const invId = `INV-2026-${100 + invoices.length + 1}`;
    const newInvoice: Invoice = {
      id: invId,
      quotationId: quote.id,
      projectId,
      projectName: newProject.name,
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerCompany: quote.customerCompany,
      customerEmail: quote.customerEmail,
      customerAddress: quote.customerAddress,
      issueDate: today,
      dueDate: deadline,
      items: [
        {
          id: `II-${Date.now()}`,
          description: `Kickoff Advance (50%) for ${newProject.name}`,
          quantity: 1,
          unitPrice: advanceAmount,
          total: advanceAmount,
        },
      ],
      subtotal: advanceAmount,
      tax: 0,
      taxAmount: 0,
      discount: 0,
      total: advanceAmount,
      amountPaid: 0,
      balanceDue: advanceAmount,
      status: 'Sent',
      paymentInstructions: 'Account Name: DDS Expo Technologies\nBank: HDFC Bank, Visakhapatnam\nIFSC: HDFC0001234',
      terms: 'Payment due within 10 days of kickoff.',
    };
    setInvoices((prev) => [newInvoice, ...prev]);

    addAuditLog(
      'Accepted Quotation & Created Project',
      'Projects',
      `${quote.id} -> ${projectId}`,
      undefined,
      `Project: ${newProject.name}, Advance Inv: ${invId}`
    );

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Project Started!',
      message: `${newProject.name} has been initiated. Advance invoice ${invId} generated.`,
      type: 'project',
      timestamp: 'Just now',
      read: false,
      linkSection: 'projects-list',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newProject;
  };

  // Create Project directly
  const createProject = (projectData: Omit<Project, 'id' | 'progress'>): Project => {
    const newProj: Project = {
      ...projectData,
      id: `PRJ-${400 + projects.length + 1}`,
      progress: 0,
    };
    setProjects((prev) => [newProj, ...prev]);
    addAuditLog('Created Project', 'Projects', `${newProj.id} (${newProj.name})`);
    return newProj;
  };

  const updateProjectStatus = (projectId: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          addAuditLog('Updated Project Status', 'Projects', p.name, `Status: ${p.status}`, `Status: ${status}`);
          return { ...p, status };
        }
        return p;
      })
    );
  };

  // Create Task
  const createTask = (taskData: Omit<Task, 'id' | 'comments'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `TSK-${1000 + tasks.length + 1}`,
      comments: [],
    };
    setTasks((prev) => [newTask, ...prev]);
    addAuditLog('Created Task', 'Projects', `${newTask.id} (${newTask.title})`, undefined, `Assignee: ${newTask.assignedEmployeeName}`);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Task Assigned',
      message: `"${newTask.title}" assigned to ${newTask.assignedEmployeeName}.`,
      type: 'task',
      timestamp: 'Just now',
      read: false,
      linkSection: 'projects-tasks',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newTask;
  };

  // Update Task Status & automatically recalculate Project Progress
  const updateTaskStatus = (taskId: string, status: Task['status'], progressOverride?: number) => {
    let affectedProjectId = '';
    const newProgress = progressOverride !== undefined ? progressOverride : status === 'Completed' ? 100 : status === 'In Progress' ? 50 : 0;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          affectedProjectId = t.projectId;
          return {
            ...t,
            status,
            progress: newProgress,
          };
        }
        return t;
      })
    );

    // Auto update project progress
    if (affectedProjectId) {
      setTimeout(() => {
        setProjects((prevProj) =>
          prevProj.map((proj) => {
            if (proj.id === affectedProjectId) {
              const projectTasks = tasks.map((t) => (t.id === taskId ? { ...t, status, progress: newProgress } : t)).filter((t) => t.projectId === affectedProjectId);
              if (projectTasks.length > 0) {
                const totalProg = projectTasks.reduce((acc, curr) => acc + (curr.progress || 0), 0);
                const avg = Math.round(totalProg / projectTasks.length);
                return { ...proj, progress: avg, status: avg === 100 ? 'Completed' : proj.status };
              }
            }
            return proj;
          })
        );
      }, 50);
    }
  };

  const addTaskComment = (taskId: string, content: string) => {
    const now = new Date();
    const dateStr = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            comments: [
              ...t.comments,
              {
                id: `C-${Date.now()}`,
                authorName: currentUser.name,
                date: dateStr,
                content,
              },
            ],
          };
        }
        return t;
      })
    );
  };

  // Timesheets
  const logTimesheet = (timesheetData: Omit<Timesheet, 'id'>) => {
    const newTs: Timesheet = {
      ...timesheetData,
      id: `TS-${Date.now().toString().slice(-4)}`,
    };
    setTimesheets((prev) => [newTs, ...prev]);
    addAuditLog('Logged Timesheet', 'Projects', `${newTs.employeeName}: ${newTs.hours}h on ${newTs.projectName}`);
  };

  // Create Invoice
  const createInvoice = (invoiceData: Omit<Invoice, 'id' | 'amountPaid' | 'balanceDue' | 'status'>): Invoice => {
    const newId = `INV-2026-${100 + invoices.length + 1}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      id: newId,
      amountPaid: 0,
      balanceDue: invoiceData.total,
      status: 'Sent',
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    addAuditLog('Created Invoice', 'Finance', `${newId} for ${newInvoice.customerCompany}`, undefined, `Amount: ₹${newInvoice.total}`);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Invoice Issued',
      message: `Invoice ${newId} (₹${newInvoice.total.toLocaleString()}) issued to ${newInvoice.customerCompany}.`,
      type: 'invoice',
      timestamp: 'Just now',
      read: false,
      linkSection: 'sales-invoices',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newInvoice;
  };

  // Record Payment
  const recordPayment = (paymentData: Omit<Payment, 'id' | 'paymentDate'>) => {
    const newPayId = `PAY-${900 + payments.length + 1}`;
    const today = new Date().toISOString().slice(0, 10);
    const newPayment: Payment = {
      ...paymentData,
      id: newPayId,
      paymentDate: today,
    };
    setPayments((prev) => [newPayment, ...prev]);

    // Update invoice
    setInvoices((prevInvoices) =>
      prevInvoices.map((inv) => {
        if (inv.id === paymentData.invoiceId) {
          const newAmountPaid = inv.amountPaid + paymentData.amount;
          const newBalance = Math.max(0, inv.total - newAmountPaid);
          const newStatus: Invoice['status'] = newBalance === 0 ? 'Paid' : 'Partially Paid';
          return {
            ...inv,
            amountPaid: newAmountPaid,
            balanceDue: newBalance,
            status: newStatus,
          };
        }
        return inv;
      })
    );

    // Create Transaction (Income)
    const newTxn: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'Income',
      amount: paymentData.amount,
      category: 'Client Payment',
      date: today,
      referenceId: paymentData.invoiceId,
      partyName: paymentData.customerName,
      paymentMethod: paymentData.paymentMethod,
    };
    setTransactions((prev) => [newTxn, ...prev]);

    // Update customer total business value
    setCustomers((prevCust) =>
      prevCust.map((c) =>
        c.id === paymentData.customerId
          ? { ...c, totalBusinessValue: c.totalBusinessValue + paymentData.amount }
          : c
      )
    );

    addAuditLog('Recorded Payment', 'Finance', `${newPayId} (₹${paymentData.amount})`, undefined, `Invoice: ${paymentData.invoiceId}`);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Payment Received!',
      message: `₹${paymentData.amount.toLocaleString()} received for invoice ${paymentData.invoiceId} via ${paymentData.paymentMethod}.`,
      type: 'payment',
      timestamp: 'Just now',
      read: false,
      linkSection: 'sales-payments',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Add Expense
  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpId = `EXP-${700 + expenses.length + 1}`;
    const newExpense: Expense = {
      ...expenseData,
      id: newExpId,
    };
    setExpenses((prev) => [newExpense, ...prev]);

    // Add Transaction (Expense)
    const newTxn: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'Expense',
      amount: expenseData.amount,
      category: expenseData.category,
      date: expenseData.date,
      referenceId: newExpId,
      partyName: expenseData.vendorName || expenseData.employeeName || 'Vendor',
      paymentMethod: 'Corporate Transfer',
    };
    setTransactions((prev) => [newTxn, ...prev]);

    addAuditLog('Recorded Expense', 'Finance', `${newExpId} (₹${expenseData.amount})`, undefined, `Category: ${expenseData.category}`);
  };

  // HR & Attendance
  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmpId = `EMP-0${employees.length + 1}`;
    const newEmp: Employee = {
      ...employeeData,
      id: newEmpId,
    };
    setEmployees((prev) => [...prev, newEmp]);
    addAuditLog('Added Employee', 'HRMS', `${newEmpId} (${newEmp.name})`);
  };

  const recordCheckIn = (employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;
    const today = new Date().toISOString().slice(0, 10);
    const nowTime = new Date().toTimeString().slice(0, 8);

    setAttendance((prev) => {
      const existing = prev.find((a) => a.employeeId === employeeId && a.date === today);
      if (existing) {
        return prev;
      }
      return [
        {
          id: `ATT-${Date.now().toString().slice(-4)}`,
          employeeId,
          employeeName: emp.name,
          date: today,
          checkIn: nowTime,
          status: 'Present',
        },
        ...prev,
      ];
    });

    addAuditLog('Employee Check-in', 'HRMS', `${emp.name} at ${nowTime}`);
  };

  const recordCheckOut = (employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;
    const today = new Date().toISOString().slice(0, 10);
    const nowTime = new Date().toTimeString().slice(0, 8);

    setAttendance((prev) =>
      prev.map((a) => {
        if (a.employeeId === employeeId && a.date === today) {
          return {
            ...a,
            checkOut: nowTime,
            workHours: 8.0,
          };
        }
        return a;
      })
    );

    addAuditLog('Employee Check-out', 'HRMS', `${emp.name} at ${nowTime}`);
  };

  const submitLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'status'>) => {
    const newReq: LeaveRequest = {
      ...req,
      id: `LEV-${Date.now().toString().slice(-4)}`,
      status: 'Pending',
    };
    setLeaveRequests((prev) => [newReq, ...prev]);
    addAuditLog('Submitted Leave Request', 'HRMS', `${req.employeeName} (${req.days} days)`);
  };

  const handleLeaveAction = (requestId: string, approve: boolean) => {
    const today = new Date().toISOString().slice(0, 10);
    setLeaveRequests((prev) =>
      prev.map((l) => {
        if (l.id === requestId) {
          const status: LeaveStatus = approve ? 'Approved' : 'Rejected';
          addAuditLog('Updated Leave Request', 'HRMS', l.id, `Status: ${l.status}`, `Status: ${status}`);
          return {
            ...l,
            status,
            approverName: currentUser.name,
            approvalDate: today,
          };
        }
        return l;
      })
    );
  };

  // Support Tickets
  const createSupportTicket = (ticketData: Omit<SupportTicket, 'id' | 'status' | 'createdDate'>): SupportTicket => {
    const newId = `TCK-${800 + supportTickets.length + 1}`;
    const nowStr = `${new Date().toISOString().slice(0, 10)} ${new Date().toTimeString().slice(0, 5)}`;
    const newTicket: SupportTicket = {
      ...ticketData,
      id: newId,
      status: 'Open',
      createdDate: nowStr,
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    addAuditLog('Created Support Ticket', 'Support', `${newId} (${newTicket.subject})`);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Support Ticket',
      message: `${newTicket.customerName}: ${newTicket.subject}`,
      type: 'ticket',
      timestamp: 'Just now',
      read: false,
      linkSection: 'support',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newTicket;
  };

  const resolveTicket = (ticketId: string, resolution: string) => {
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          addAuditLog('Resolved Support Ticket', 'Support', t.id, `Status: ${t.status}`, 'Status: Resolved');
          return { ...t, status: 'Resolved', resolution };
        }
        return t;
      })
    );
  };

  // Documents
  const addDocument = (docData: Omit<ErpDocument, 'id' | 'uploadDate'>) => {
    const newDoc: ErpDocument = {
      ...docData,
      id: `DOC-${100 + documents.length + 1}`,
      uploadDate: new Date().toISOString().slice(0, 10),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    addAuditLog('Uploaded Document', 'Documents', newDoc.title);
  };

  const deleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    addAuditLog('Deleted Document', 'Documents', docId);
  };

  // Purchasing
  const createPurchaseOrder = (poData: Omit<PurchaseOrder, 'id' | 'status'>) => {
    const newId = `PO-${300 + purchaseOrders.length + 1}`;
    const newPO: PurchaseOrder = {
      ...poData,
      id: newId,
      status: 'Pending Approval',
    };
    setPurchaseOrders((prev) => [newPO, ...prev]);
    addAuditLog('Created Purchase Order', 'Purchasing', `${newId} for ${poData.vendorName}`);
  };

  const updatePurchaseOrderStatus = (poId: string, status: PurchaseOrder['status']) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id === poId) {
          addAuditLog('Updated PO Status', 'Purchasing', po.id, `Status: ${po.status}`, `Status: ${status}`);
          return { ...po, status, approvedBy: status === 'Approved' ? currentUser.name : po.approvedBy };
        }
        return po;
      })
    );
  };

  // Inventory
  const addInventoryProduct = (productData: Omit<InventoryProduct, 'id'>) => {
    const newId = `PRD-${100 + inventory.length + 1}`;
    const newProduct: InventoryProduct = {
      ...productData,
      id: newId,
    };
    setInventory((prev) => [...prev, newProduct]);
    addAuditLog('Added Inventory Product', 'Inventory', `${newId} (${newProduct.name})`);
  };

  const recordStockMovement = (movementData: Omit<StockMovement, 'id' | 'date'>) => {
    const today = new Date().toISOString().slice(0, 10);
    const newMove: StockMovement = {
      ...movementData,
      id: `SM-${Date.now().toString().slice(-4)}`,
      date: today,
    };
    setStockMovements((prev) => [newMove, ...prev]);

    // adjust inventory quantity
    setInventory((prev) =>
      prev.map((p) => {
        if (p.id === movementData.productId) {
          const delta = movementData.type === 'In' ? movementData.quantity : -movementData.quantity;
          return {
            ...p,
            quantity: Math.max(0, p.quantity + delta),
          };
        }
        return p;
      })
    );

    addAuditLog(
      'Stock Movement',
      'Inventory',
      `${movementData.productName} (${movementData.type} ${movementData.quantity})`
    );
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Reset all to clean initial state
  const resetAllData = () => {
    localStorage.clear();
    setDepartments(INITIAL_DEPARTMENTS);
    setEmployees(INITIAL_EMPLOYEES);
    setServices(INITIAL_SERVICES);
    setCustomers(INITIAL_CUSTOMERS);
    setLeads(INITIAL_LEADS);
    setFollowUps(INITIAL_FOLLOWUPS);
    setQuotations(INITIAL_QUOTATIONS);
    setProjects(INITIAL_PROJECTS);
    setMilestones(INITIAL_MILESTONES);
    setTasks(INITIAL_TASKS);
    setTimesheets(INITIAL_TIMESHEETS);
    setInvoices(INITIAL_INVOICES);
    setPayments(INITIAL_PAYMENTS);
    setExpenses(INITIAL_EXPENSES);
    setTransactions(INITIAL_TRANSACTIONS);
    setSalesTargets(INITIAL_SALES_TARGETS);
    setInventory(INITIAL_INVENTORY);
    setStockMovements(INITIAL_STOCK_MOVEMENTS);
    setVendors(INITIAL_VENDORS);
    setPurchaseOrders(INITIAL_PURCHASE_ORDERS);
    setSupportTickets(INITIAL_SUPPORT_TICKETS);
    setDocuments(INITIAL_DOCUMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCommunications(INITIAL_COMMUNICATIONS);
  };

  return (
    <ErpContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrentUser,
        hasPermission,
        activeModule,
        setActiveModule,
        isPortalOpen,
        setIsPortalOpen,
        departments,
        employees,
        services,
        customers,
        leads,
        followUps,
        quotations,
        projects,
        milestones,
        tasks,
        timesheets,
        invoices,
        payments,
        expenses,
        transactions,
        salesTargets,
        inventory,
        stockMovements,
        vendors,
        purchaseOrders,
        supportTickets,
        documents,
        notifications,
        auditLogs,
        communications,
        attendance,
        leaveRequests,
        payroll,
        setCurrentUserRole,
        markAttendance,
        applyLeave,
        approveLeave,
        rejectLeave,
        createTicket,
        updateTicketStatus,
        addTicketReply,
        addLead,
        updateLeadStatus,
        convertLeadToCustomer,
        addFollowUp,
        completeFollowUp,
        addCustomer,
        createQuotation,
        updateQuotationStatus,
        acceptQuotationAndCreateProject,
        createProject,
        updateProjectStatus,
        createTask,
        updateTaskStatus,
        addTaskComment,
        logTimesheet,
        createInvoice,
        recordPayment,
        addExpense,
        addEmployee,
        recordCheckIn,
        recordCheckOut,
        submitLeaveRequest,
        handleLeaveAction,
        createSupportTicket,
        resolveTicket,
        addDocument,
        deleteDocument,
        createPurchaseOrder,
        updatePurchaseOrderStatus,
        addInventoryProduct,
        recordStockMovement,
        markNotificationRead,
        markAllNotificationsRead,
        addAuditLog,
        resetAllData,
      }}
    >
      {children}
    </ErpContext.Provider>
  );
};

export const useErp = () => {
  const context = useContext(ErpContext);
  if (!context) {
    throw new Error('useErp must be used within an ErpProvider');
  }
  return context;
};
