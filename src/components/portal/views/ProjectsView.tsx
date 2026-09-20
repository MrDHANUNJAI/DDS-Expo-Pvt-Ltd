import React, { useState } from 'react';
import {
  Briefcase,
  CheckSquare,
  Clock,
  Flag,
  Plus,
  Search,
  User,
  Calendar,
  ChevronRight,
  MessageSquare,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useErp } from '../../../context/ErpContext';
import { Project, Task, TaskStatus, PriorityLevel, ProjectStatus } from '../../../types/erp';

export const ProjectsView: React.FC = () => {
  const {
    projects,
    tasks,
    timesheets,
    milestones,
    employees,
    customers,
    services,
    currentUser,
    createProject,
    updateProjectStatus,
    createTask,
    updateTaskStatus,
    addTaskComment,
    logTimesheet,
  } = useErp();

  const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'timesheets' | 'milestones'>('projects');
  const [taskViewMode, setTaskViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterProject, setFilterProject] = useState<string>('All');
  const [filterAssignee, setFilterAssignee] = useState<string>('All');

  // Modals
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLogTimesheetOpen, setIsLogTimesheetOpen] = useState(false);
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState('');

  // Form States
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    customerId: customers[0]?.id || '',
    service: services[0]?.name || 'Web & Tech',
    projectManagerId: employees[2]?.id || 'EMP-03',
    projectManagerName: employees[2]?.name || 'Mr. Srikanth',
    startDate: new Date().toISOString().slice(0, 10),
    deadline: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    budget: 85000,
    status: 'Active' as ProjectStatus,
    description: '',
  });

  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    projectId: projects[0]?.id || '',
    assignedEmployeeId: employees[4]?.id || 'EMP-05',
    priority: 'High' as PriorityLevel,
    startDate: new Date().toISOString().slice(0, 10),
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    status: 'To Do' as TaskStatus,
  });

  const [timesheetForm, setTimesheetForm] = useState({
    projectId: projects[0]?.id || '',
    date: new Date().toISOString().slice(0, 10),
    hours: 4.0,
    description: '',
    isBillable: true,
  });

  const taskStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Completed', 'Blocked'];

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = filterProject === 'All' || t.projectId === filterProject;
    const matchesAssignee = filterAssignee === 'All' || t.assignedEmployeeName === filterAssignee;
    return matchesSearch && matchesProject && matchesAssignee;
  });

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === newProjectForm.customerId);
    const pm = employees.find((emp) => emp.id === newProjectForm.projectManagerId);

    createProject({
      ...newProjectForm,
      customerName: cust ? `${cust.name} (${cust.company})` : 'Client',
      projectManagerName: pm ? pm.name : newProjectForm.projectManagerName,
      teamMemberIds: [newProjectForm.projectManagerId, 'EMP-05'],
    });

    setIsAddProjectOpen(false);
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === newTaskForm.projectId);
    const emp = employees.find((e) => e.id === newTaskForm.assignedEmployeeId);

    createTask({
      ...newTaskForm,
      projectName: proj ? proj.name : 'Project',
      assignedEmployeeName: emp ? emp.name : 'Employee',
      progress: 0,
    });

    setIsAddTaskOpen(false);
  };

  const handleLogTimesheetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === timesheetForm.projectId);

    logTimesheet({
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      projectId: timesheetForm.projectId,
      projectName: proj ? proj.name : 'Project',
      date: timesheetForm.date,
      hours: Number(timesheetForm.hours),
      description: timesheetForm.description,
      isBillable: timesheetForm.isBillable,
    });

    setIsLogTimesheetOpen(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForDetails || !newComment.trim()) return;
    addTaskComment(selectedTaskForDetails.id, newComment.trim());
    setNewComment('');
    // refresh detail reference
    const updated = tasks.find((t) => t.id === selectedTaskForDetails.id);
    if (updated) setSelectedTaskForDetails(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Projects & Delivery Operations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliver client milestones, manage sprint tasks, and log employee timesheets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLogTimesheetOpen(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
          >
            <Clock className="w-4 h-4" /> Log Hours
          </button>
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
          <button
            onClick={() => setIsAddProjectOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Briefcase className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setActiveTab('projects')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          All Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'tasks'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          Task Board ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('timesheets')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'timesheets'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Clock className="w-4 h-4" />
          Timesheets ({timesheets.length})
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'milestones'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Flag className="w-4 h-4" />
          Milestones
        </button>
      </div>

      {/* TAB 1: ALL PROJECTS */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => {
            const projectTasks = tasks.filter((t) => t.projectId === p.id);
            const completedCount = projectTasks.filter((t) => t.status === 'Completed').length;

            return (
              <div
                key={p.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-slate-400 font-semibold">{p.id}</span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        p.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'Testing' || p.status === 'Client Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">{p.name}</h3>
                  <div className="text-xs text-slate-500 mt-1">{p.customerName}</div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">Delivery Progress</span>
                      <strong className="text-slate-900 font-bold">{p.progress}%</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>PM: <strong className="text-slate-800">{p.projectManagerName}</strong></span>
                    <span>Deadline: <strong className="text-slate-800">{p.deadline}</strong></span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">
                      Tasks: <strong className="text-slate-900">{completedCount}/{projectTasks.length}</strong> completed
                    </span>
                    <span className="font-bold text-slate-900">₹{p.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: TASKS BOARD */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-sm w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700"
              >
                <option value="All">All Projects</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <select
                value={filterAssignee}
                onChange={(e) => setFilterAssignee(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700"
              >
                <option value="All">All Team Members</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.name}>{e.name}</option>
                ))}
              </select>

              <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setTaskViewMode('kanban')}
                  className={`px-3 py-1 text-xs font-semibold ${
                    taskViewMode === 'kanban' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  Kanban
                </button>
                <button
                  onClick={() => setTaskViewMode('list')}
                  className={`px-3 py-1 text-xs font-semibold ${
                    taskViewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Kanban Mode */}
          {taskViewMode === 'kanban' && (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-[1100px]">
                {taskStatuses.map((st) => {
                  const columnTasks = filteredTasks.filter((t) => t.status === st);
                  return (
                    <div
                      key={st}
                      className="flex-1 bg-slate-50/80 rounded-2xl border border-slate-200 p-3.5 flex flex-col min-h-[500px]"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">{st}</h4>
                        <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center">
                          {columnTasks.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1 overflow-y-auto">
                        {columnTasks.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTaskForDetails(t)}
                            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 shadow-2xs hover:shadow-md transition cursor-pointer space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-semibold text-slate-900 text-sm">{t.title}</span>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                                  t.priority === 'Urgent'
                                    ? 'bg-rose-100 text-rose-700'
                                    : t.priority === 'High'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {t.priority}
                              </span>
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2">{t.description}</p>
                            <div className="text-[11px] text-slate-400 font-mono">{t.projectName}</div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span className="text-slate-600 font-medium">{t.assignedEmployeeName}</span>
                              <div className="flex items-center gap-1 text-slate-400">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{t.comments.length}</span>
                              </div>
                            </div>

                            {/* Move stage control */}
                            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={t.status}
                                onChange={(e) => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                                className="w-full text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-600 focus:outline-none"
                              >
                                {taskStatuses.map((status) => (
                                  <option key={status} value={status}>Move to: {status}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* List Mode */}
          {taskViewMode === 'list' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Task</th>
                    <th className="px-4 py-3.5">Project</th>
                    <th className="px-4 py-3.5">Assignee</th>
                    <th className="px-4 py-3.5">Priority</th>
                    <th className="px-4 py-3.5">Deadline</th>
                    <th className="px-4 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTasks.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTaskForDetails(t)}
                      className="hover:bg-slate-50/80 transition cursor-pointer"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900">{t.title}</td>
                      <td className="px-4 py-4 text-xs text-slate-500">{t.projectName}</td>
                      <td className="px-4 py-4 text-xs text-slate-700">{t.assignedEmployeeName}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            t.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-600">{t.deadline}</td>
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={t.status}
                          onChange={(e) => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                          className="text-xs font-semibold px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg"
                        >
                          {taskStatuses.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TIMESHEETS */}
      {activeTab === 'timesheets' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Project</th>
                <th className="px-4 py-3.5">Hours Logged</th>
                <th className="px-4 py-3.5">Work Description</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-5 py-3.5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timesheets.map((ts) => (
                <tr key={ts.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4 font-semibold text-slate-900">{ts.employeeName}</td>
                  <td className="px-4 py-4 text-xs text-slate-600">{ts.projectName}</td>
                  <td className="px-4 py-4 font-bold text-blue-600">{ts.hours} hrs</td>
                  <td className="px-4 py-4 text-xs text-slate-600 max-w-md">{ts.description}</td>
                  <td className="px-4 py-4 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded font-medium ${
                        ts.isBillable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {ts.isBillable ? 'Billable' : 'Internal'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-xs text-slate-500">{ts.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between text-sm shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    m.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{m.title}</div>
                  <div className="text-xs text-slate-400">Project: {m.projectId} • Due: {m.dueDate}</div>
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  m.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {m.completed ? 'Delivered' : 'Pending Milestone'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TASK DETAILS & COMMENTS MODAL */}
      {selectedTaskForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 font-semibold">{selectedTaskForDetails.id}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedTaskForDetails.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTaskForDetails(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="text-slate-700">{selectedTaskForDetails.description}</div>
                <div className="grid grid-cols-2 gap-2 text-slate-500 pt-2 border-t border-slate-200">
                  <div>Project: <strong className="text-slate-800">{selectedTaskForDetails.projectName}</strong></div>
                  <div>Assignee: <strong className="text-slate-800">{selectedTaskForDetails.assignedEmployeeName}</strong></div>
                  <div>Deadline: <strong className="text-slate-800">{selectedTaskForDetails.deadline}</strong></div>
                  <div>Status: <strong className="text-slate-800">{selectedTaskForDetails.status}</strong></div>
                </div>
              </div>

              {/* Comments Thread */}
              <div>
                <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-2">
                  Collaboration Thread ({selectedTaskForDetails.comments.length})
                </h4>
                <div className="space-y-2">
                  {selectedTaskForDetails.comments.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between font-semibold text-slate-800 mb-1">
                        <span>{c.authorName}</span>
                        <span className="text-slate-400 font-normal">{c.date}</span>
                      </div>
                      <p className="text-slate-600">{c.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Post progress update or blocker..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Create New Delivery Project</h3>
              <button onClick={() => setIsAddProjectOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProjectSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js Mobile Web Portal"
                  value={newProjectForm.name}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer *</label>
                <select
                  value={newProjectForm.customerId}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, customerId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Manager</label>
                  <select
                    value={newProjectForm.projectManagerId}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, projectManagerId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={newProjectForm.budget}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newProjectForm.startDate}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={newProjectForm.deadline}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  value={newProjectForm.description}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddProjectOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
                  Launch Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Assign Sprint Task</h3>
              <button onClick={() => setIsAddTaskOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateTaskSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design responsive navbar & hero"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project</label>
                <select
                  value={newTaskForm.projectId}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, projectId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assignee</label>
                  <select
                    value={newTaskForm.assignedEmployeeId}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, assignedEmployeeId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value as PriorityLevel })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={newTaskForm.deadline}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddTaskOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOG TIMESHEET MODAL */}
      {isLogTimesheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Log Working Hours</h3>
              <button onClick={() => setIsLogTimesheetOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleLogTimesheetSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project</label>
                <select
                  value={timesheetForm.projectId}
                  onChange={(e) => setTimesheetForm({ ...timesheetForm, projectId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hours Worked</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={timesheetForm.hours}
                    onChange={(e) => setTimesheetForm({ ...timesheetForm, hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={timesheetForm.date}
                    onChange={(e) => setTimesheetForm({ ...timesheetForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Done Summary</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of code written, UI components designed, bug fixes..."
                  value={timesheetForm.description}
                  onChange={(e) => setTimesheetForm({ ...timesheetForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsLogTimesheetOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
                  Record Timesheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
