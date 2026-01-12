export enum AgentState {
  IDLE = 'IDLE',
  PLANNING = 'PLANNING', // System 2
  RESEARCHING = 'RESEARCHING',
  VOTING = 'VOTING', // Cerebras Swarm
  VERIFYING = 'VERIFYING', // Grits/Tests
  COMMITTING = 'COMMITTING' // Gitoxide
}

export interface TaskDetails {
  issues: string[];
  snippet?: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  depth: number;
  children?: Task[];
  details?: TaskDetails;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  source: 'System 1' | 'System 2' | 'Grits' | 'Gitoxide';
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface GraphNode {
  id: string;
  group: number; // 1: Logic, 2: Data, 3: UI, 4: Ext
  val: number; // Size
  label: string;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface VoteCandidate {
  id: number;
  snippet: string;
  score: number;
  redFlags: string[]; // Grits topological analysis
  status: 'accepted' | 'rejected' | 'pending';
}