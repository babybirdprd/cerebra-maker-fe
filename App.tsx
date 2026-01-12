import React, { useState } from 'react';
import { Sidebar, MobileNav } from './components/Sidebar';
import TimeSlider from './components/TimeSlider';
import GraphView from './components/GraphView';
import PlanView from './components/PlanView';
import ExecutionPanel from './components/ExecutionPanel';
import { GRAPH_LINKS, GRAPH_NODES } from './constants';
import { AgentState } from './types';
import { Search, Bell, User } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [agentState, setAgentState] = useState<AgentState>(AgentState.VOTING);

  // Render logic for the main content area
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full p-4 lg:p-6 overflow-y-auto lg:overflow-hidden">
            <div className="lg:col-span-4 h-96 lg:h-full bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden flex flex-col shrink-0">
                 <div className="p-4 border-b border-zinc-800 bg-zinc-900/80">
                     <h3 className="font-bold text-zinc-300">Active Plan</h3>
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <PlanView />
                 </div>
            </div>
            <div className="lg:col-span-8 h-full flex flex-col gap-4 lg:gap-6 shrink-0">
                 <div className="h-64 lg:h-[40%] bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden shrink-0">
                    <GraphView nodes={GRAPH_NODES} links={GRAPH_LINKS} />
                 </div>
                 <div className="flex-1 lg:h-[60%] min-h-[400px] bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden shrink-0">
                     <ExecutionPanel />
                 </div>
            </div>
          </div>
        );
      case 'topology':
        return (
            <div className="p-4 lg:p-6 h-full">
                <GraphView nodes={GRAPH_NODES} links={GRAPH_LINKS} />
            </div>
        );
      case 'execution':
        return <ExecutionPanel />;
      case 'history':
        return (
            <div className="p-6 h-full flex flex-col items-center justify-center text-zinc-500">
                <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center max-w-lg w-full">
                    <h2 className="text-xl text-white font-bold mb-2">Shadow Repo Browser</h2>
                    <p>Gitoxide is managing 483 atomic micro-commits in `.shadow/`</p>
                    <p className="mt-4 text-xs font-mono bg-black p-4 rounded text-left overflow-x-auto">
                        $ git log --oneline --graph<br/>
                        * 7a9f2b (HEAD) feat: impl safe jwt encode<br/>
                        * 8b1c4d chore: add claims struct<br/>
                        * 1a2b3c fix: red-flag violation on unwrap<br/>
                        ...
                    </p>
                </div>
            </div>
        );
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-black text-white font-sans overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:flex h-full">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      </div>
      
      <div className="flex-1 flex flex-col h-full min-h-0">
        {/* Top Header */}
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 bg-zinc-950 shrink-0">
            <div className="flex items-center gap-2 lg:gap-4 text-sm text-zinc-400">
                <span className="text-zinc-600 hidden sm:inline">Project / </span>
                <span className="text-white font-medium truncate max-w-[120px] sm:max-w-none">cerebras-maker-core</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] lg:text-xs border border-indigo-500/20 uppercase font-bold tracking-wide">
                    {agentState}
                </span>
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search symbols..." 
                        className="bg-zinc-900 border border-zinc-700 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-500 w-48 lg:w-64 transition-colors"
                    />
                </div>
                <button className="sm:hidden text-zinc-400"><Search size={18} /></button>
                <div className="w-px h-4 bg-zinc-800 hidden sm:block"></div>
                <button className="text-zinc-400 hover:text-white"><Bell size={18} /></button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-zinc-500 flex items-center justify-center">
                    <User size={14} className="text-zinc-300" />
                </div>
            </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-hidden relative bg-zinc-950/50 flex flex-col min-h-0">
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
                style={{ backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
           </div>
           
           <div className="relative z-10 h-full flex flex-col min-h-0">
            {renderContent()}
           </div>
        </main>

        {/* Reliability Timeline - Always visible footer above nav */}
        <TimeSlider />

        {/* Mobile Bottom Nav - Hidden on Desktop */}
        <div className="md:hidden">
            <MobileNav currentView={currentView} onChangeView={setCurrentView} />
        </div>
      </div>
    </div>
  );
};

export default App;