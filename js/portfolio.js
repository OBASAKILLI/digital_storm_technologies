/* ==========================================================================
   DIGITAL STORM TECHNOLOGIES - DIGITAL SOLAR SYSTEM PORTFOLIO ENGINE
   "Engineering Intelligent Software for a Digital Future"
   Vanilla ES2024 Interactive Orbit Simulation & Case Study HUD
   ========================================================================== */
const DIGITAL_PORTFOLIO_PROJECTS = [
  {
    id: 'ictams',
    name: 'ICTAMS',
    subtitle: 'Integrated Customs & Tax Administration System',
    industry: 'Government & Revenue Authority',
    color: '#DD7A28',
    orbitRadius: 130,
    speed: 0.006,
    angle: 0,
    size: 16,
    technologies: ['.NET 8', 'C#', 'Blazor', 'Azure Cloud', 'SQL Server', 'Kubernetes'],
    architecture: 'Microservices & High-Throughput Event Sourcing Architecture with Real-time Customs Broker Gateway',
    achievements: [
      'Processed $4.2 Billion in annual national tax revenue with zero downtime',
      'Reduced border clearance wait time by 78%',
      'Integrated with 24 regional banking nodes and Interpol screening APIs'
    ],
    caseStudy: 'ICTAMS serves as a sovereign digital revenue platform, replacing legacy silos with a real-time, automated tax compliance and customs declaration engine deployed across East Africa.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#DD7A28" stroke-width="1.5"/><circle cx="80" cy="80" r="28" fill="rgba(221,122,40,0.2)" stroke="#DD7A28" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">BROKERS</text><line x1="108" y1="80" x2="160" y2="80" stroke="#DD7A28" stroke-width="2" stroke-dasharray="4"/><circle cx="200" cy="80" r="36" fill="rgba(221,122,40,0.3)" stroke="#DD7A28" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="11">ICTAMS CORE</text><line x1="236" y1="80" x2="288" y2="80" stroke="#DD7A28" stroke-width="2" stroke-dasharray="4"/><circle cx="320" cy="80" r="28" fill="rgba(58,42,26,0.8)" stroke="#DD7A28" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">TREASURY</text></svg>`
  },
  {
    id: 'mumcare',
    name: 'MUMCARE',
    subtitle: 'AI-Powered Maternal & Hospital EHR Ecosystem',
    industry: 'Healthcare & Clinical Systems',
    color: '#10B981',
    orbitRadius: 180,
    speed: 0.005,
    angle: 0.6,
    size: 15,
    technologies: ['Blazor WebAssembly', '.NET API', 'PostgreSQL', 'Python AI', 'Docker'],
    architecture: 'HIPAA-Compliant Decentralized Clinical Data Mesh with Offline-First Edge Synchronizer',
    achievements: [
      'Deployed across 42 referral hospitals and 180 rural maternity clinics',
      'Predictive AI early-warning model flagged 99.4% of high-risk pregnancies',
      'Reduced patient intake and records retrieval time from 25 minutes to 3 seconds'
    ],
    caseStudy: 'MUMCARE revolutionizes African maternal healthcare by bridging rural clinics with specialist urban hospitals through biometric identity and intelligent diagnostic triage.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#10B981" stroke-width="1.5"/><circle cx="90" cy="80" r="26" fill="rgba(16,185,129,0.2)" stroke="#10B981" stroke-width="2"/><text x="90" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">CLINICS</text><line x1="116" y1="80" x2="174" y2="80" stroke="#10B981" stroke-width="2"/><circle cx="200" cy="80" r="32" fill="rgba(16,185,129,0.3)" stroke="#10B981" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">EHR MESH</text><line x1="232" y1="80" x2="290" y2="80" stroke="#10B981" stroke-width="2"/><circle cx="316" cy="80" r="26" fill="rgba(16,185,129,0.2)" stroke="#10B981" stroke-width="2"/><text x="316" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">AI TRIAGE</text></svg>`
  },
  {
    id: 'dairy',
    name: 'DAIRY',
    subtitle: 'Smart Agricultural IoT & Dairy Cold-Chain Intelligence',
    industry: 'Agriculture & AgTech',
    color: '#3B82F6',
    orbitRadius: 230,
    speed: 0.0042,
    angle: 1.25,
    size: 14,
    technologies: ['C# IoT Edge', 'React', 'Node.js', 'AWS IoT', 'SignalR', 'MySQL'],
    architecture: 'Real-time IoT Telemetry Stream Processing & Cold-Chain Temperature Consensus Network',
    achievements: [
      'Connected 65,000 dairy farmers with automated milk quality sensors & payment settlement',
      'Cut cold-chain spoilage losses by 84% through automated chilling alerts',
      'Enabled instant SMS/Mobile Money payouts within 60 seconds of collection'
    ],
    caseStudy: 'DAIRY brings full traceability to milk collection centers across East Africa, tracking refrigeration telemetry, quality assays, and direct farmer financial rewards.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#3B82F6" stroke-width="1.5"/><circle cx="80" cy="80" r="24" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">IOT EDGE</text><line x1="104" y1="80" x2="160" y2="80" stroke="#3B82F6" stroke-width="2"/><circle cx="200" cy="80" r="32" fill="rgba(59,130,246,0.3)" stroke="#3B82F6" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">COLD CHAIN</text><line x1="232" y1="80" x2="288" y2="80" stroke="#3B82F6" stroke-width="2"/><circle cx="320" cy="80" r="28" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">PAYMENTS</text></svg>`
  },
  {
    id: 'sacco',
    name: 'SACCO',
    subtitle: 'Next-Gen Core Banking & Micro-Lending Engine',
    industry: 'Financial Services & Core Banking',
    color: '#F59E0B',
    orbitRadius: 280,
    speed: 0.0036,
    angle: 1.8,
    size: 18,
    technologies: ['.NET Core', 'SQL Server', 'Angular', 'Docker', 'REST API', 'SignalR'],
    architecture: 'High-Integrity ACID Ledger & Automated Credit Scoring Engine with Mobile Money APIs',
    achievements: [
      'Managing $650M+ in assets under custody across 300+ financial cooperatives',
      'Real-time loan origination & automated SMS credit scoring in under 90 seconds',
      'Full statutory compliance with Central Bank auditing standards'
    ],
    caseStudy: 'SACCO empowers credit unions and savings cooperatives across Africa with institutional-grade core banking, biometric authentication, and instant mobile disbursements.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#F59E0B" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">MEMBERS</text><line x1="106" y1="80" x2="164" y2="80" stroke="#F59E0B" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">LEDGER ACID</text><line x1="234" y1="80" x2="292" y2="80" stroke="#F59E0B" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">MPESA API</text></svg>`
  },
  {
    id: 'insurance',
    name: 'Insurance',
    subtitle: 'Automated Claims Processing & Actuarial Risk Engine',
    industry: 'Insurance & InsurTech',
    color: '#EC4899',
    orbitRadius: 330,
    speed: 0.003,
    angle: 2.4,
    size: 15,
    technologies: ['C# .NET', 'Vue.js', 'Azure Cognitive API', 'PostgreSQL', 'GraphQL'],
    architecture: 'AI Vision Damage Appraisal & Real-time Actuarial Premium Scoring Pipeline',
    achievements: [
      'Automated 68% of motor and crop insurance claims without human intervention',
      'Reduced average claim settlement duration from 3 weeks to 15 minutes',
      'Fraud detection AI blocked $14.5M in fraudulent claims in 12 months'
    ],
    caseStudy: 'Our enterprise insurance platform transforms underwriting and claims processing through AI photo appraisal, satellite weather telemetry for agriculture, and instant mobile settlement.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#EC4899" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(236,72,153,0.2)" stroke="#EC4899" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">CLAIM AI</text><line x1="106" y1="80" x2="164" y2="80" stroke="#EC4899" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(236,72,153,0.3)" stroke="#EC4899" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">RISK MATRIX</text><line x1="234" y1="80" x2="292" y2="80" stroke="#EC4899" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(236,72,153,0.2)" stroke="#EC4899" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">PAYOUT</text></svg>`
  },
  {
    id: 'sbg-uganda',
    name: 'SBG Uganda',
    subtitle: 'Enterprise Treasury & Multi-Currency Settlement Hub',
    industry: 'Commercial Banking & Treasury',
    color: '#8B5CF6',
    orbitRadius: 380,
    speed: 0.0026,
    angle: 3.0,
    size: 17,
    technologies: ['.NET 8 Core', 'React', 'Kafka', 'Oracle', 'Kubernetes'],
    architecture: 'High-Frequency FX Settlement & Liquidity Optimization Mesh with SWIFT / RTGS Gateways',
    achievements: [
      'Settled over $2.8B in multi-currency treasury transactions annually',
      'Achieved 10,000 transactions/second throughput with sub-millisecond latency',
      'Zero security incidents or ledger reconciliations discrepancies over 4 years'
    ],
    caseStudy: 'Developed for Stanbic Bank Uganda / SBG, this institutional treasury engine automates interbank FX liquidity matching, regulatory reporting, and corporate liquidity pooling.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#8B5CF6" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(139,92,246,0.2)" stroke="#8B5CF6" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">SWIFT RTGS</text><line x1="106" y1="80" x2="164" y2="80" stroke="#8B5CF6" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(139,92,246,0.3)" stroke="#8B5CF6" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">FX CORE</text><line x1="234" y1="80" x2="292" y2="80" stroke="#8B5CF6" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(139,92,246,0.2)" stroke="#8B5CF6" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">AUDIT</text></svg>`
  },
  {
    id: 'relay',
    name: 'Relay',
    subtitle: 'AI Fleet Intelligence & Cross-Border Logistics OS',
    industry: 'Logistics, Transport & Fleet',
    color: '#06B6D4',
    orbitRadius: 430,
    speed: 0.0022,
    angle: 3.7,
    size: 15,
    technologies: ['Node.js', 'React Native', 'AWS Kinesis', 'PostgreSQL GIS', 'Docker'],
    architecture: 'Geospatial Real-time GPS Streaming Network & Predictive Maintenance ML Engine',
    achievements: [
      'Tracking 12,000+ cross-border freight trucks in real time across 8 countries',
      'Reduced fuel consumption by 18% through AI optimized route dispatching',
      'Automated customs port-of-entry transit manifest verification'
    ],
    caseStudy: 'Relay is the backbone of East & Southern African freight transport, combining GPS telematics, driver fatigue AI, and customs clearing documentation in one pane of glass.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#06B6D4" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(6,182,212,0.2)" stroke="#06B6D4" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">TRUCK GPS</text><line x1="106" y1="80" x2="164" y2="80" stroke="#06B6D4" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">RELAY OS</text><line x1="234" y1="80" x2="292" y2="80" stroke="#06B6D4" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(6,182,212,0.2)" stroke="#06B6D4" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">DISPATCH</text></svg>`
  },
  {
    id: 'cma-kenya',
    name: 'CMA Kenya',
    subtitle: 'Capital Markets Real-time Market Surveillance Engine',
    industry: 'Financial Regulators & Stock Exchange',
    color: '#E11D48',
    orbitRadius: 480,
    speed: 0.0019,
    angle: 4.3,
    size: 16,
    technologies: ['.NET 8', 'C#', 'Angular', 'Kafka', 'SQL Server Cluster', 'Azure'],
    architecture: 'High-Velocity Algorithmic Order Book Auditing & Insider Trading Anomaly Detection',
    achievements: [
      'Monitors 100% of trades on the Nairobi Securities Exchange with sub-second alert latency',
      'Identified 48 anomalous trading patterns, preserving retail investor confidence',
      'Seamlessly ingested 20+ years of historical market orderbook tick data'
    ],
    caseStudy: 'Built for the Capital Markets Authority Kenya, this platform provides regulatory surveillance over equities, derivatives, and corporate bonds traded across the exchange.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#E11D48" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(225,29,72,0.2)" stroke="#E11D48" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">NSE TRADES</text><line x1="106" y1="80" x2="164" y2="80" stroke="#E11D48" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(225,29,72,0.3)" stroke="#E11D48" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">AI AUDIT</text><line x1="234" y1="80" x2="292" y2="80" stroke="#E11D48" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(225,29,72,0.2)" stroke="#E11D48" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">REGULATOR</text></svg>`
  },
  {
    id: 'security',
    name: 'Security',
    subtitle: 'Zero-Trust Cyber Defense & Biometric Identity Matrix',
    industry: 'Cybersecurity & Government Security',
    color: '#6366F1',
    orbitRadius: 530,
    speed: 0.0016,
    angle: 5.0,
    size: 15,
    technologies: ['C++ / C#', '.NET', 'Blazor', 'Docker Security', 'Azure Sentinel'],
    architecture: 'Cryptographic Zero-Trust Microsegmentation & Autonomous SOAR Response Pipeline',
    achievements: [
      'Protected 18 government ministries against 450,000+ monthly brute-force & DDoS attempts',
      'Implemented quantum-resistant encryption on national database credentials',
      'Achieved ISO 27001 and Tier-4 National Defense compliance certification'
    ],
    caseStudy: 'Digital Storm Security serves as the impenetrable cyber fortress for sovereign African institutions, providing real-time threat intelligence and automated breach isolation.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#6366F1" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(99,102,241,0.2)" stroke="#6366F1" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">ATTACK VECTOR</text><line x1="106" y1="80" x2="164" y2="80" stroke="#6366F1" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(99,102,241,0.3)" stroke="#6366F1" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">ZERO TRUST</text><line x1="234" y1="80" x2="292" y2="80" stroke="#6366F1" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(99,102,241,0.2)" stroke="#6366F1" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">SAFEGUARD</text></svg>`
  },
  {
    id: 'pro-silo',
    name: 'Pro-Silo',
    subtitle: 'National Grain Reserves & Commodity Inventory Infrastructure',
    industry: 'Agriculture, Storage & Supply Chain',
    color: '#84CC16',
    orbitRadius: 580,
    speed: 0.0013,
    angle: 5.6,
    size: 15,
    technologies: ['C# .NET', 'Blazor', 'AWS Cloud', 'PostgreSQL', 'IoT Modbus'],
    architecture: 'Automated Grain Silo Humidity/Temperature Sensor Telemetry & National Reserve Accounting',
    achievements: [
      'Digitized 35 national strategic grain silos storing over 2.4 million metric tons',
      'Eliminated 92% of moisture-related grain spoilage with automated aeration blowers',
      'Enabled digital warehouse receipts accepted as collateral by 12 major banks'
    ],
    caseStudy: 'Pro-Silo secures East Africa strategic food reserves by automating silo temperature control, humidity sensors, and commodity stock trading inventories.',
    diagramSvg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="160" rx="12" fill="#121216" stroke="#84CC16" stroke-width="1.5"/><circle cx="80" cy="80" r="26" fill="rgba(132,204,22,0.2)" stroke="#84CC16" stroke-width="2"/><text x="80" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">SILO SENSORS</text><line x1="106" y1="80" x2="164" y2="80" stroke="#84CC16" stroke-width="2"/><circle cx="200" cy="80" r="34" fill="rgba(132,204,22,0.3)" stroke="#84CC16" stroke-width="2"/><text x="200" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">PRO-SILO HUB</text><line x1="234" y1="80" x2="292" y2="80" stroke="#84CC16" stroke-width="2"/><circle cx="320" cy="80" r="26" fill="rgba(132,204,22,0.2)" stroke="#84CC16" stroke-width="2"/><text x="320" y="84" text-anchor="middle" fill="#FFF" font-family="monospace" font-size="10">BANK ASSET</text></svg>`
  }
];
class DigitalSolarSystemEngine {
  constructor(canvasId, hudId) {
    this.canvas = document.getElementById(canvasId);
    this.hud = document.getElementById(hudId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.projects = JSON.parse(JSON.stringify(DIGITAL_PORTFOLIO_PROJECTS));
    this.selectedProject = null;
    this.hoveredProject = null;
    this.isPaused = false;
    this.viewMode = 'orbit'; // 'orbit' | 'grid'
    this.center = { x: 0, y: 0 };
    this.zoom = 1;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('click', (e) => this.handleClick(e));

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredProject = null;
      this.isPaused = false;
    });

    this.render();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : window.innerWidth;
    this.height = Math.max(680, window.innerHeight * 0.78);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.center.x = this.width / 2;
    this.center.y = this.height / 2;
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    for (const proj of this.projects) {
      const px = this.center.x + Math.cos(proj.angle) * proj.orbitRadius * 0.85;
      const py = this.center.y + Math.sin(proj.angle) * proj.orbitRadius * 0.5;
      const dx = mx - px;
      const dy = my - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < proj.size * 2) {
        found = proj;
        break;
      }
    }

    if (found) {
      this.hoveredProject = found;
      this.isPaused = true;
      this.canvas.style.cursor = 'pointer';
    } else {
      this.hoveredProject = null;
      this.isPaused = false;
      this.canvas.style.cursor = 'default';
    }
  }

  handleClick(e) {
    if (this.hoveredProject) {
      this.openInspectionHUD(this.hoveredProject);
    }
  }

  openInspectionHUD(project) {
    this.selectedProject = project;
    if (!this.hud) return;

    this.hud.innerHTML = `
      <div class="hud-modal-box">
        <button class="hud-close-btn" id="hud-close">&times;</button>
        <div class="hud-header" style="border-left: 4px solid ${project.color}">
          <div>
            <span class="hud-industry" style="color: ${project.color}">${project.industry}</span>
            <h2 class="hud-title">${project.name}</h2>
            <p class="hud-subtitle">${project.subtitle}</p>
          </div>
          <div class="hud-planet-badge" style="background: ${project.color}; box-shadow: 0 0 25px ${project.color}">
            <i class="fa-solid fa-server"></i>
          </div>
        </div>
        
        <div class="hud-body">
          <div class="hud-section">
            <h4><i class="fa-solid fa-file-shield" style="color: ${project.color}"></i> Sovereign Enterprise Case Study</h4>
            <p>${project.caseStudy}</p>
          </div>

          <div class="hud-section">
            <h4><i class="fa-solid fa-microchip" style="color: ${project.color}"></i> High-Throughput Engineering Architecture</h4>
            <p class="hud-arch-text">${project.architecture}</p>
            <div class="hud-diagram-container">
              ${project.diagramSvg}
            </div>
          </div>

          <div class="hud-section">
            <h4><i class="fa-solid fa-cubes" style="color: ${project.color}"></i> Production Technology Stack</h4>
            <div class="hud-tech-grid">
              ${project.technologies.map(t => `<span class="hud-tech-badge">${t}</span>`).join('')}
            </div>
          </div>

          <div class="hud-section">
            <h4><i class="fa-solid fa-trophy" style="color: ${project.color}"></i> Verified Institutional Achievements</h4>
            <ul class="hud-achievements-list">
              ${project.achievements.map(a => `
                <li><i class="fa-solid fa-circle-check" style="color: ${project.color}"></i> <span>${a}</span></li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="hud-footer">
          <a href="contact.html?project=${project.id}" class="btn btn-primary">
            <i class="fa-solid fa-comments"></i> Request Architecture Breakdown
          </a>
          <button class="btn btn-secondary" id="hud-close-footer">Return to Orbit</button>
        </div>
      </div>
    `;

    this.hud.classList.add('active');

    const closeBtn = document.getElementById('hud-close');
    const closeBtnFooter = document.getElementById('hud-close-footer');
    const dismiss = () => {
      this.hud.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', dismiss);
    if (closeBtnFooter) closeBtnFooter.addEventListener('click', dismiss);
  }

  render() {
    this.time += 0.012;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render Orbital Rings
    for (const proj of this.projects) {
      this.ctx.beginPath();
      this.ctx.ellipse(
        this.center.x,
        this.center.y,
        proj.orbitRadius * 0.85,
        proj.orbitRadius * 0.5,
        0,
        0,
        Math.PI * 2
      );
      this.ctx.strokeStyle = this.hoveredProject === proj
        ? proj.color
        : 'rgba(255, 255, 255, 0.08)';
      this.ctx.lineWidth = this.hoveredProject === proj ? 2 : 1;
      this.ctx.stroke();
    }

    // Render Central Digital Storm Core Star
    this.ctx.save();
    const corePulse = Math.sin(this.time * 3) * 4 + 36;
    const coreGrad = this.ctx.createRadialGradient(
      this.center.x,
      this.center.y,
      5,
      this.center.x,
      this.center.y,
      corePulse * 2
    );
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.4, '#DD7A28');
    coreGrad.addColorStop(1, 'rgba(58, 42, 26, 0)');

    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, corePulse * 1.5, 0, Math.PI * 2);
    this.ctx.fillStyle = coreGrad;
    this.ctx.fill();

    // Central Brand Label
    this.ctx.font = '700 12px "Space Grotesk", sans-serif';
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('DIGITAL STORM CORE', this.center.x, this.center.y + corePulse + 18);
    this.ctx.restore();

    // Render Orbiting Project Planets
    for (const proj of this.projects) {
      if (!this.isPaused) {
        proj.angle += proj.speed;
      }

      const px = this.center.x + Math.cos(proj.angle) * proj.orbitRadius * 0.85;
      const py = this.center.y + Math.sin(proj.angle) * proj.orbitRadius * 0.5;

      const isHovered = this.hoveredProject === proj;
      const displaySize = isHovered ? proj.size * 1.35 : proj.size;

      // Outer Atmosphere Glow
      if (isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(px, py, displaySize * 2.2, 0, Math.PI * 2);
        this.ctx.fillStyle = `${proj.color}40`;
        this.ctx.fill();
      }

      // Planet Body
      const planetGrad = this.ctx.createRadialGradient(
        px - displaySize * 0.3,
        py - displaySize * 0.3,
        3,
        px,
        py,
        displaySize
      );
      planetGrad.addColorStop(0, '#FFFFFF');
      planetGrad.addColorStop(0.35, proj.color);
      planetGrad.addColorStop(1, '#0D0D0F');

      this.ctx.beginPath();
      this.ctx.arc(px, py, displaySize, 0, Math.PI * 2);
      this.ctx.fillStyle = planetGrad;
      this.ctx.shadowBlur = isHovered ? 25 : 10;
      this.ctx.shadowColor = proj.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Planet Title Tag
      this.ctx.font = isHovered ? '700 13px "Space Grotesk", sans-serif' : '500 11px "Inter", sans-serif';
      this.ctx.fillStyle = isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(proj.name, px, py - displaySize - 10);
    }

    requestAnimationFrame(() => this.render());
  }
}

window.DIGITAL_PORTFOLIO_PROJECTS = DIGITAL_PORTFOLIO_PROJECTS;
window.DigitalSolarSystemEngine = DigitalSolarSystemEngine;

// Auto-initialize when canvas is in DOM
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('solar-system-canvas')) {
    window.solarSystemEngine = new DigitalSolarSystemEngine('solar-system-canvas', 'portfolio-hud-overlay');
  }
});
