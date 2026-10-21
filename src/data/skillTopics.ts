export interface SkillTopic {
  level_number: number;
  topic: string;
  description?: string;
}

export interface SkillRoadmap {
  skill_set_id: number;
  skill_set_name: string;
  levels: SkillTopic[];
}

export const SKILL_TOPICS_MAP: Record<number, SkillTopic[]> = {
  // 1: Data Structures & Algorithms
  1: [
    { level_number: 1, topic: "Time & Space Complexity (Big-O analysis)" },
    { level_number: 2, topic: "Arrays, Strings & Basic Manipulation" },
    { level_number: 3, topic: "Singly & Doubly Linked Lists" },
    { level_number: 4, topic: "Stacks & Queues (Implementation & Applications)" },
    { level_number: 5, topic: "Recursion & Backtracking Fundamentals" },
    { level_number: 6, topic: "Binary Trees & Binary Search Trees Traversal" },
    { level_number: 7, topic: "Heaps, Priority Queues & Greedy Algorithms" },
    { level_number: 8, topic: "Graph Algorithms (BFS, DFS, Dijkstra, Topo Sort)" },
    { level_number: 9, topic: "Dynamic Programming (1D/2D Subproblems, Knapsack)" },
    { level_number: 10, topic: "Advanced Tries, Segment Trees & Competitive DSA" },
  ],

  // 2: Object-Oriented Programming
  2: [
    { level_number: 1, topic: "Classes, Objects & Constructor Initialization" },
    { level_number: 2, topic: "Encapsulation, Data Hiding & Access Modifiers" },
    { level_number: 3, topic: "Single & Multiple Inheritance Hierarchies" },
    { level_number: 4, topic: "Polymorphism (Method Overloading & Overriding)" },
    { level_number: 5, topic: "Abstract Classes, Interfaces & Protocol Contracts" },
    { level_number: 6, topic: "Exception Handling, Custom Errors & Resource Cleanup" },
    { level_number: 7, topic: "SOLID Design Principles (SRP, OCP, LSP, ISP, DIP)" },
    { level_number: 8, topic: "Creational & Structural Patterns (Singleton, Factory, Adapter)" },
    { level_number: 9, topic: "Behavioral Patterns (Observer, Strategy, Command)" },
    { level_number: 10, topic: "Enterprise Domain Modeling & Clean Architecture" },
  ],

  // 3: SQL & Databases
  3: [
    { level_number: 1, topic: "Relational Concepts, Tables & Primary/Foreign Keys" },
    { level_number: 2, topic: "Basic DDL & DML (SELECT, INSERT, UPDATE, DELETE)" },
    { level_number: 3, topic: "Filtering & Sorting (WHERE, ORDER BY, GROUP BY, HAVING)" },
    { level_number: 4, topic: "Multi-table Joins (INNER, LEFT, RIGHT, FULL OUTER)" },
    { level_number: 5, topic: "Subqueries, Nested Queries & Correlated Queries" },
    { level_number: 6, topic: "Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD)" },
    { level_number: 7, topic: "Database Normalization (1NF through BCNF) & ER Diagrams" },
    { level_number: 8, topic: "Indexes (B-Tree, Hash), EXPLAIN Plans & Query Optimization" },
    { level_number: 9, topic: "Transactions, ACID Properties & Isolation Levels" },
    { level_number: 10, topic: "Partitioning, Sharding, Replication & NoSQL Parity" },
  ],

  // 4: Cloud Fundamentals (AWS/Azure)
  4: [
    { level_number: 1, topic: "Cloud Computing Models (IaaS, PaaS, SaaS, Public/Private)" },
    { level_number: 2, topic: "Core Compute Services (AWS EC2, Azure VMs, Compute Instances)" },
    { level_number: 3, topic: "Object & Block Storage (AWS S3, EBS, Azure Blob, Disks)" },
    { level_number: 4, topic: "Virtual Networks, Subnets, Security Groups & CIDR Blocks" },
    { level_number: 5, topic: "Identity & Access Management (IAM Policies, Roles & RBAC)" },
    { level_number: 6, topic: "Managed Databases (AWS RDS, DynamoDB, Azure SQL, Cosmos DB)" },
    { level_number: 7, topic: "Serverless Compute & Event Triggers (AWS Lambda, Azure Functions)" },
    { level_number: 8, topic: "Load Balancing, Autoscaling Groups & High Availability" },
    { level_number: 9, topic: "Cloud Monitoring, Logging & Cost Optimization Tools" },
    { level_number: 10, topic: "Infrastructure as Code (Terraform/CloudFormation) & Cloud Security" },
  ],

  // 5: Operating Systems
  5: [
    { level_number: 1, topic: "OS Architecture, Kernel vs User Mode & System Calls" },
    { level_number: 2, topic: "Process Management & Lifecycle States (PCB, Context Switching)" },
    { level_number: 3, topic: "Threads, Concurrency & Multithreading Models" },
    { level_number: 4, topic: "CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)" },
    { level_number: 5, topic: "Process Synchronization (Mutexes, Semaphores, Critical Section)" },
    { level_number: 6, topic: "Deadlocks (Handling, Detection, Prevention, Banker's Algorithm)" },
    { level_number: 7, topic: "Memory Management (Paging, Segmentation & Address Translation)" },
    { level_number: 8, topic: "Virtual Memory, Page Replacement (LRU, FIFO) & Thrashing" },
    { level_number: 9, topic: "File Systems, Inodes, Directory Structures & Disk Scheduling" },
    { level_number: 10, topic: "Linux Kernel Internals, IPC Mechanisms & Containerization Primitives" },
  ],

  // 6: Computer Networks
  6: [
    { level_number: 1, topic: "OSI 7-Layer & TCP/IP 4-Layer Reference Models" },
    { level_number: 2, topic: "Physical & Data Link Layers (Ethernet, MAC, Framing, ARP)" },
    { level_number: 3, topic: "IP Addressing, IPv4/IPv6, Subnetting & Supernetting" },
    { level_number: 4, topic: "Routing Protocols (Static vs Dynamic, OSPF, BGP Basics)" },
    { level_number: 5, topic: "Transport Layer: TCP 3-Way Handshake, Flow & Congestion Control" },
    { level_number: 6, topic: "Transport Layer: UDP Characteristics & Real-time Protocols" },
    { level_number: 7, topic: "Application Protocols (DNS, HTTP/1.1, HTTP/2, HTTP/3, FTP, SMTP)" },
    { level_number: 8, topic: "Network Security (SSL/TLS Handshake, Firewalls, NAT, VPNs)" },
    { level_number: 9, topic: "Socket Programming & Network Packet Analysis with Wireshark" },
    { level_number: 10, topic: "Modern CDN Architectures, Edge Computing & Zero-Trust Networks" },
  ],

  // 7: Aptitude & Logical Reasoning
  7: [
    { level_number: 1, topic: "Number Systems, Divisibility Rules & Percentages" },
    { level_number: 2, topic: "Ratios, Proportions, Mixtures & Allegations" },
    { level_number: 3, topic: "Profit & Loss, Simple & Compound Interest" },
    { level_number: 4, topic: "Time, Speed & Distance, Boats, Streams & Trains" },
    { level_number: 5, topic: "Time & Work, Pipes & Cisterns" },
    { level_number: 6, topic: "Permutations, Combinations & Classical Probability" },
    { level_number: 7, topic: "Logical Deductions, Syllogisms & Venn Diagrams" },
    { level_number: 8, topic: "Data Interpretation (Bar Charts, Pie Charts, Tabular Analysis)" },
    { level_number: 9, topic: "Blood Relations, Direction Sense & Seating Arrangements" },
    { level_number: 10, topic: "Critical Reasoning, Statement Assumptions & Analytical Puzzles" },
  ],

  // 8: Communication & Behavioral
  8: [
    { level_number: 1, topic: "Clear Verbal Articulation & Professional Introduction Pitch" },
    { level_number: 2, topic: "Active Listening & Constructive Question Framing" },
    { level_number: 3, topic: "Professional Email Etiquette & Technical Documentation" },
    { level_number: 4, topic: "Non-Verbal Cues, Body Language & Video Interview Presence" },
    { level_number: 5, topic: "STAR Method for Behavioral & Situational Questions" },
    { level_number: 6, topic: "Handling Conflict Resolution & Peer Collaboration" },
    { level_number: 7, topic: "Cross-Cultural Communication & Global Enterprise Mindset" },
    { level_number: 8, topic: "Leadership, Ownership & Accountability in Ambiguity" },
    { level_number: 9, topic: "Persuasive Presentation Skills & Stakeholder Storytelling" },
    { level_number: 10, topic: "Executive Briefing & Strategic Business Communication" },
  ],

  // 9: Web Development Basics
  9: [
    { level_number: 1, topic: "Semantic HTML5 Elements & Accessible Markup (ARIA)" },
    { level_number: 2, topic: "CSS3 Fundamentals, Box Model, Flexbox & Grid Layouts" },
    { level_number: 3, topic: "JavaScript Fundamentals (Variables, Scope, ES6+ Syntax)" },
    { level_number: 4, topic: "DOM Manipulation, Browser Events & Event Bubbling" },
    { level_number: 5, topic: "Asynchronous JS (Promises, Async/Await & Fetch API)" },
    { level_number: 6, topic: "Client-Side Storage (LocalStorage, SessionStorage, Cookies)" },
    { level_number: 7, topic: "Component-Driven UI (React Props, State & Hooks Lifecycle)" },
    { level_number: 8, topic: "RESTful API Integration, HTTP Methods & Error Handling" },
    { level_number: 9, topic: "Web Performance, Core Web Vitals & Asset Bundling" },
    { level_number: 10, topic: "Web Security (CORS, CSRF, XSS Prevention, Content Security)" },
  ],

  // 10: System Design (Intro)
  10: [
    { level_number: 1, topic: "Client-Server Architecture & Stateless vs Stateful Services" },
    { level_number: 2, topic: "Latency, Throughput, Bandwidth & Availability Calculations" },
    { level_number: 3, topic: "Load Balancers (Layer 4 vs Layer 7, Health Checks)" },
    { level_number: 4, topic: "Caching Strategies (Redis, Memcached, Cache-Aside, Write-Through)" },
    { level_number: 5, topic: "Database Scaling: Vertical vs Horizontal Scaling, Read Replicas" },
    { level_number: 6, topic: "CAP Theorem, PACELC & Consistency Models (Strong vs Eventual)" },
    { level_number: 7, topic: "Message Queues & Asynchronous Processing (Kafka, RabbitMQ)" },
    { level_number: 8, topic: "Microservices vs Monoliths & API Gateways" },
    { level_number: 9, topic: "Rate Limiting Algorithms (Token Bucket, Leaky Bucket)" },
    { level_number: 10, topic: "Designing High-Scale URL Shortener / Rate Limiter End-to-End" },
  ],

  // 11: Git & Version Control
  11: [
    { level_number: 1, topic: "Git Concepts: Working Directory, Staging Area & Repository" },
    { level_number: 2, topic: "Essential Commands (init, clone, add, commit, status, log)" },
    { level_number: 3, topic: "Branching Strategies, Switching & Merging Branches" },
    { level_number: 4, topic: "Resolving Merge Conflicts & Understanding Diffs" },
    { level_number: 5, topic: "Remote Repositories (fetch, pull, push, upstream tracking)" },
    { level_number: 6, topic: "Stashing Uncommitted Work & Cleaning Working Trees" },
    { level_number: 7, topic: "Rebasing vs Merging & Interactive Rebase" },
    { level_number: 8, topic: "Cherry-Picking, Reset (soft/hard) & Revert Workflows" },
    { level_number: 9, topic: "Pull Request Workflows, Code Review & Git Hooks" },
    { level_number: 10, topic: "Git Bisect for Bug Hunting, Submodules & Monorepo Tooling" },
  ],

  // 12: Generative AI Basics
  12: [
    { level_number: 1, topic: "Generative AI vs Discriminative AI & LLM Core Concepts" },
    { level_number: 2, topic: "Prompt Engineering Essentials (Zero-shot, Few-shot, CoT)" },
    { level_number: 3, topic: "Tokens, Embeddings, Context Windows & Temperature Tuning" },
    { level_number: 4, topic: "Transformer Architecture Fundamentals (Self-Attention Mechanism)" },
    { level_number: 5, topic: "Retrieval-Augmented Generation (RAG) Architecture & Vector DBs" },
    { level_number: 6, topic: "Function Calling, Tool Use & Structured JSON Output" },
    { level_number: 7, topic: "Autonomous AI Agents, Workflows & Multi-Agent Coordination" },
    { level_number: 8, topic: "Model Fine-Tuning (LoRA, QLoRA) vs In-Context Learning" },
    { level_number: 9, topic: "Responsible AI: Hallucination Mitigation, Safety & Bias Audits" },
    { level_number: 10, topic: "Production LLM App Deployment, Caching, Tracing & Evaluation" },
  ],
};

export function getTopicsForSkill(skillId: number, fallbackName?: string): SkillTopic[] {
  if (SKILL_TOPICS_MAP[skillId]) {
    return SKILL_TOPICS_MAP[skillId];
  }
  // Fallback 10 generic topics if an unknown skill is added
  return Array.from({ length: 10 }, (_, i) => ({
    level_number: i + 1,
    topic: `Level ${i + 1}: ${fallbackName || "Technical Mastery"} proficiency milestone`,
  }));
}
