import React, { useState } from 'react';
import {
  Users,
  Clock,
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  XCircle,
  Plus,
  Printer,
  X,
  Building,
} from 'lucide-react';
import { useErp } from '../../../context/ErpContext';
import { Employee, LeaveRequest, PayrollRecord, AttendanceStatus, LeaveType } from '../../../types/erp';

export const HrView: React.FC = () => {
  const {
    employees,
    attendance,
    leaveRequests,
    payroll,
    currentUser,
    markAttendance,
    applyLeave,
    approveLeave,
    rejectLeave,
  } = useErp();

  const [activeTab, setActiveTab] = useState<'employees' | 'attendance' | 'leaves' | 'payroll' | 'performance'>('employees');

  // Modals
  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);
  const [selectedPayrollForSlip, setSelectedPayrollForSlip] = useState<PayrollRecord | null>(null);

  // Leave Form State
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual' as LeaveType,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    reason: '',
  });

  const todayStr = new Date().toISOString().slice(0, 10);
  const myTodayAttendance = attendance.find(
    (a) => a.employeeId === currentUser.employeeId && a.date === todayStr
  );

  const handleClockIn = () => {
    markAttendance(currentUser.employeeId, 'Present', '09:30 AM');
  };

  const handleClockOut = () => {
    markAttendance(currentUser.employeeId, 'Present', undefined, '06:30 PM');
  };

  const handleApplyLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1);

    applyLeave({
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      leaveType: leaveForm.leaveType,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      days,
      reason: leaveForm.reason,
    });

    setIsApplyLeaveOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Human Resources & Team Operations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Employee directory, live attendance punch, leave requests and monthly payroll
          </p>
        </div>

        {/* Live Attendance Clock In/Out */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <Clock className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="text-xs">
            <div className="font-semibold text-slate-800">
              {myTodayAttendance ? `Clocked: ${myTodayAttendance.clockIn || myTodayAttendance.checkIn || '09:30 AM'}` : 'Not clocked in today'}
            </div>
            <div className="text-[10px] text-slate-400">
              {myTodayAttendance?.clockOut || myTodayAttendance?.checkOut ? `Out: ${myTodayAttendance.clockOut || myTodayAttendance.checkOut}` : 'Shift: 09:30 AM - 06:30 PM'}
            </div>
          </div>
          {!myTodayAttendance?.clockIn && !myTodayAttendance?.checkIn ? (
            <button
              onClick={handleClockIn}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
            >
              Clock In
            </button>
          ) : !myTodayAttendance?.clockOut && !myTodayAttendance?.checkOut ? (
            <button
              onClick={handleClockOut}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition"
            >
              Clock Out
            </button>
          ) : (
            <span className="text-xs text-emerald-600 font-semibold px-2 py-1 bg-emerald-50 rounded">
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setActiveTab('employees')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'employees'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" /> Team Directory ({employees.length})
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'attendance'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Clock className="w-4 h-4" /> Daily Attendance
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'leaves'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" /> Leave Requests ({leaveRequests.filter((l) => l.status === 'Pending').length})
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'payroll'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Payroll & Payslips
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'performance'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Award className="w-4 h-4" /> Performance Matrix
        </button>
      </div>

      {/* TAB 1: EMPLOYEES DIRECTORY */}
      {activeTab === 'employees' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{emp.name}</span>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">{emp.designation}</div>
                  <div className="text-xs text-slate-400">{emp.department} • {emp.id}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-500">
                <div className="flex justify-between">
                  <span>Role Permission:</span>
                  <strong className="text-slate-800">{emp.role}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-slate-700 truncate max-w-[180px]">{emp.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="text-slate-700">{emp.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Base CTC:</span>
                  <strong className="text-slate-900">₹{(emp.salary || emp.monthlySalary || 0).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: DAILY ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Clock In</th>
                <th className="px-4 py-3.5">Clock Out</th>
                <th className="px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendance.map((att) => (
                <tr key={att.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4 font-semibold text-slate-900">{att.employeeName}</td>
                  <td className="px-4 py-4 text-xs text-slate-600">{att.date}</td>
                  <td className="px-4 py-4 font-mono text-xs text-slate-700">{att.clockIn || att.checkIn || '—'}</td>
                  <td className="px-4 py-4 font-mono text-xs text-slate-700">{att.clockOut || att.checkOut || '—'}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        att.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : att.status === 'Leave' || (att.status as string) === 'On Leave'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: LEAVE REQUESTS */}
      {activeTab === 'leaves' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Team Leave Approvals</h3>
              <p className="text-xs text-slate-400">Casual, sick, and paid leave applications</p>
            </div>
            <button
              onClick={() => setIsApplyLeaveOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Apply for Leave
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-4 py-3.5">Leave Type</th>
                  <th className="px-4 py-3.5">Dates</th>
                  <th className="px-4 py-3.5">Days</th>
                  <th className="px-4 py-3.5">Reason</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaveRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 font-semibold text-slate-900">{req.employeeName}</td>
                    <td className="px-4 py-4 text-xs">
                      <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-700">
                        {req.leaveType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">{req.startDate} to {req.endDate}</td>
                    <td className="px-4 py-4 font-bold text-slate-900">{req.days}</td>
                    <td className="px-4 py-4 text-xs text-slate-500 max-w-xs truncate">{req.reason}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      {req.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => approveLeave(req.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectLeave(req.id)}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PAYROLL & PAYSLIPS */}
      {activeTab === 'payroll' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Month</th>
                <th className="px-4 py-3.5">Base Salary</th>
                <th className="px-4 py-3.5">Bonus / Incentives</th>
                <th className="px-4 py-3.5">Deductions</th>
                <th className="px-4 py-3.5">Net Salary</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payroll.map((pay: PayrollRecord) => (
                <tr key={pay.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4 font-semibold text-slate-900">{pay.employeeName}</td>
                  <td className="px-4 py-4 text-xs text-slate-600">{pay.month} {pay.year}</td>
                  <td className="px-4 py-4 font-mono text-xs">₹{pay.baseSalary.toLocaleString()}</td>
                  <td className="px-4 py-4 font-mono text-xs text-emerald-600">+₹{pay.bonus.toLocaleString()}</td>
                  <td className="px-4 py-4 font-mono text-xs text-rose-600">-₹{pay.deductions.toLocaleString()}</td>
                  <td className="px-4 py-4 font-bold text-slate-900 font-mono">₹{pay.netSalary.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                      {pay.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedPayrollForSlip(pay);
                        setIsPayslipOpen(true);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                    >
                      View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: PERFORMANCE MATRIX */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {employees.map((emp) => (
            <div key={emp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                  <div className="text-xs text-slate-400">{emp.designation}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-500">Tasks Completed</span>
                  <strong className="text-slate-900">28 Sprints</strong>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-500">On-Time Delivery Rate</span>
                  <strong className="text-emerald-600">96.4%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Peer Collaboration Score</span>
                  <strong className="text-blue-600">4.9 / 5.0</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* APPLY LEAVE MODAL */}
      {isApplyLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Submit Leave Request</h3>
              <button onClick={() => setIsApplyLeaveOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleApplyLeaveSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type</label>
                <select
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value as LeaveType })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                >
                  <option value="Casual">Casual Leave (CL)</option>
                  <option value="Sick">Sick Leave (SL)</option>
                  <option value="Paid">Privilege / Paid Leave (PL)</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain reason for leave..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsApplyLeaveOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE PAYSLIP MODAL */}
      {isPayslipOpen && selectedPayrollForSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-semibold text-sm">Monthly Payslip: {selectedPayrollForSlip.month} {selectedPayrollForSlip.year}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Payslip
                </button>
                <button onClick={() => setIsPayslipOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6 text-slate-800 text-xs">
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">DDS Expo Technologies Pvt Ltd</h3>
                  <p className="text-slate-500">Visakhapatnam, Andhra Pradesh, India</p>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-slate-900">PAYSLIP</div>
                  <div className="text-slate-500">{selectedPayrollForSlip.month} {selectedPayrollForSlip.year}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                <div>Employee Name: <strong className="text-slate-900">{selectedPayrollForSlip.employeeName}</strong></div>
                <div>Employee ID: <strong className="text-slate-900">{selectedPayrollForSlip.employeeId}</strong></div>
                <div>Payment Status: <strong className="text-emerald-700">{selectedPayrollForSlip.status}</strong></div>
                <div>Disbursed Date: <strong className="text-slate-900">{selectedPayrollForSlip.paidDate}</strong></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-slate-700 uppercase mb-2">Earnings</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Basic CTC</span>
                      <span>₹{selectedPayrollForSlip.baseSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Special Incentives</span>
                      <span>₹{selectedPayrollForSlip.bonus.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-slate-700 uppercase mb-2">Deductions</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-rose-600">
                      <span>Leaves / Unpaid</span>
                      <span>-₹{selectedPayrollForSlip.deductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Net Salary Payable:</span>
                <span className="text-emerald-700 text-base font-mono">
                  ₹{selectedPayrollForSlip.netSalary.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
