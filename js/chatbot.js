/* ==========================================================================
   DIGITAL STORM TECHNOLOGIES - STORM AI ASSISTANT ENGINE
   "Engineering Intelligent Software for a Digital Future"
   ChatGPT-Rivaling Digital Assistant with Voice, Estimators & Context Memory
   ========================================================================== */

class StormAIAssistant {
  constructor() {
    this.modal = null;
    this.body = null;
    this.input = null;
    this.sendBtn = null;
    this.micBtn = null;
    this.voiceToggle = null;
    this.isListening = false;
    this.speechEnabled = false; // Muted by default so voice never speaks on page navigation
    this.contextHistory = [];
    let name = 'Enterprise Visitor';
    try { name = localStorage.getItem('dst_user_name') || name; } catch(e) {}
    this.userName = name;

    this.knowledgeBase = {
      hospital: {
        title: 'Enterprise Hospital EHR & Clinical System (MUMCARE Architecture)',
        reply: 'We architect HIPAA-compliant hospital systems modeled after our **MUMCARE** platform. Key capabilities include:\n\n- Decentralized Clinical EHR with Edge Offline Synchronization\n- AI Maternal & High-Risk Patient Diagnostic Triage\n- Integrated Biometric Pharmacy & Inventory POS\n- Automated Insurance Claims Integration\n\nWould you like an instant pricing estimate or an architecture consultation?',
        pills: ['Hospital Pricing Estimate', 'Book Clinical Consultation', 'View MUMCARE Case Study']
      },
      erp: {
        title: 'Custom Sovereign Enterprise ERP',
        reply: 'Our enterprise ERPs are handcrafted on **.NET 8, C#, Blazor, and PostgreSQL** for zero-latency African operations. We cover:\n\n1. **Core Accounting & General Ledger** (Multi-currency audit trail)\n2. **Supply Chain & Warehouse Management** (Pro-Silo & DAIRY IoT telematics)\n3. **Human Capital & Payroll** (Statutory tax compliance)\n\nWhat industry are you deploying for?',
        pills: ['Government ERP', 'Manufacturing ERP', 'AgriTech Supply Chain ERP', 'Estimate ERP Timeline']
      },
      mobile: {
        title: 'High-Performance Mobile & Edge Apps',
        reply: 'We build high-speed **Flutter & React Native** apps with offline-first local SQLite replication—essential for field operations across Africa. Our apps power:\n\n- SACCO Mobile Money Instant Lending\n- Relay Cross-Border Freight Telematics\n- Agricultural Farmer Milk Payment SMS Gateways\n\nWould you like to review sample integration code or explore mobile architectures?',
        pills: ['Show C# Mobile API Code', 'SACCO Banking Demo', 'Schedule Technical Demo']
      },
      pricing: {
        title: 'Interactive Software Estimator',
        reply: 'I can generate an instant estimation range based on your enterprise tier. Select your project scope below:',
        isCalculator: true
      },
      meeting: {
        title: 'Executive & Engineering Consultation Scheduling',
        reply: 'Let’s lock in a direct engineering discovery session with our Chief Architect. Choose an available slot below:',
        isScheduler: true
      },
      code: {
        title: 'Sovereign API Integration Snippet (.NET 8 C#)',
        reply: 'Here is an example of our production-ready **Zero-Trust Tokenized API Handler** used in ICTAMS & SACCO core banking:',
        isCode: true,
        codeSnippet: `// Digital Storm Technologies - Production Core Banking Gateway (.NET 8)
[ApiController]
[Route("api/v1/sovereign-ledger")]
[Authorize(AuthenticationSchemes = "ZeroTrustMtls")]
public class CoreBankingLedgerController : ControllerBase
{
    private readonly ISovereignAccountService _ledger;

    public CoreBankingLedgerController(ISovereignAccountService ledger)
    {
        _ledger = ledger;
    }

    [HttpPost("disburse-instant")]
    public async Task<IActionResult> DisburseMicroLoan([FromBody] LoanRequestDto dto)
    {
        var result = await _ledger.ExecuteAtomicTransferAsync(
            sourceAccount: "DST-TREASURY-01",
            destinationPhone: dto.CustomerMsisdn,
            amount: dto.PrincipalAmount,
            currency: "UGX",
            idempotencyKey: dto.IdempotencyKey
        );

        return result.IsSuccess ? Ok(result) : BadRequest(result.Error);
    }
}`
      }
    };

    this.init();
  }

  init() {
    this.createLauncherUI();
    this.createModalUI();
    this.attachEvents();
    this.checkSessionGreeting();
  }

  createLauncherUI() {
    const existing = document.getElementById('storm-ai-launcher');
    if (existing) return;

    const launcher = document.createElement('div');
    launcher.id = 'storm-ai-launcher';
    launcher.className = 'storm-ai-launcher';
    launcher.innerHTML = `
      <div class="storm-ai-tooltip">
        <span>STORM AI</span>
        <i class="fa-solid fa-sparkles" style="color: var(--orange)"></i>
      </div>
      <div class="storm-ai-orb" id="storm-orb-btn" role="button" aria-label="Open STORM AI Assistant">
        <i class="fa-solid fa-brain"></i>
      </div>
    `;
    document.body.appendChild(launcher);
  }

  createModalUI() {
    const existing = document.getElementById('storm-ai-modal');
    if (existing) return;

    const modal = document.createElement('div');
    modal.id = 'storm-ai-modal';
    modal.className = 'storm-ai-modal';
    modal.innerHTML = `
      <div class="ai-header">
        <div class="ai-title-wrap">
          <div class="ai-mini-orb"><i class="fa-solid fa-sparkles"></i></div>
          <div>
            <div class="ai-title">STORM AI — Digital Assistant</div>
            <div class="ai-status">Connected to Digital Storm Core</div>
          </div>
        </div>
        <div class="ai-header-controls">
          <button class="ai-ctrl-btn" id="ai-voice-toggle" title="Toggle Voice Output" aria-label="Toggle Voice Output">
            <i class="fa-solid fa-volume-xmark" style="color: var(--white-alpha-40)"></i>
          </button>
          <button class="ai-ctrl-btn" id="ai-clear-btn" title="Clear Conversation" aria-label="Clear Conversation">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button class="ai-ctrl-btn" id="ai-close-btn" title="Close STORM AI" aria-label="Close STORM AI">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <div class="ai-body" id="ai-body">
        <!-- Messages dynamically rendered -->
      </div>

      <div class="ai-footer">
        <div class="ai-input-wrap">
          <input type="text" id="ai-input" class="ai-input" placeholder="Ask STORM AI anything about our software..." autocomplete="off" />
          <button class="ai-mic-btn" id="ai-mic-btn" title="Voice Recognition" aria-label="Voice Recognition">
            <i class="fa-solid fa-microphone"></i>
          </button>
          <button class="ai-send-btn" id="ai-send-btn" title="Send Message" aria-label="Send Message">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    this.modal = modal;
    this.body = modal.querySelector('#ai-body');
    this.input = modal.querySelector('#ai-input');
    this.sendBtn = modal.querySelector('#ai-send-btn');
    this.micBtn = modal.querySelector('#ai-mic-btn');
    this.voiceToggle = modal.querySelector('#ai-voice-toggle');
  }

  attachEvents() {
    const orbBtn = document.getElementById('storm-orb-btn');
    const closeBtn = document.getElementById('ai-close-btn');
    const clearBtn = document.getElementById('ai-clear-btn');

    if (orbBtn) orbBtn.addEventListener('click', () => this.toggleModal());
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearConversation());

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleUserSubmit());
    }

    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleUserSubmit();
      });
    }

    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => this.toggleVoiceRecognition());
    }

    if (this.voiceToggle) {
      this.voiceToggle.addEventListener('click', () => {
        this.speechEnabled = !this.speechEnabled;
        this.voiceToggle.innerHTML = this.speechEnabled
          ? '<i class="fa-solid fa-volume-high" style="color: var(--orange)"></i>'
          : '<i class="fa-solid fa-volume-xmark" style="color: var(--white-alpha-40)"></i>';
      });
    }
  }

  toggleModal() {
    if (!this.modal) return;
    this.modal.classList.toggle('active');
    if (this.modal.classList.contains('active') && this.input) {
      this.input.focus();
    }
  }

  closeModal() {
    if (this.modal) this.modal.classList.remove('active');
  }

  clearConversation() {
    if (!this.body) return;
    this.body.innerHTML = '';
    this.contextHistory = [];
    this.checkSessionGreeting();
  }

  checkSessionGreeting() {
    if (!this.body || this.body.children.length > 0) return;

    const initialPills = [
      'Build Hospital System',
      'Need ERP',
      'Need Mobile App',
      'Pricing',
      'Book Consultation'
    ];

    const greeting = `Hello ${this.userName}, welcome to **Digital Storm Technologies**. I am **STORM AI**, your enterprise digital assistant.\n\nLooking to architect a hospital EHR system, sovereign tax core, or an Africa-wide logistics platform?`;

    this.appendBotMessage(greeting, initialPills, null, false);
  }

  handleUserSubmit() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text) return;

    this.input.value = '';
    this.appendUserMessage(text);
    this.processResponse(text);
  }

  appendUserMessage(text) {
    if (!this.body) return;
    const msg = document.createElement('div');
    msg.className = 'ai-message user';
    msg.innerHTML = `
      <div class="ai-avatar"><i class="fa-solid fa-user"></i></div>
      <div class="ai-bubble">${this.escapeHtml(text)}</div>
    `;
    this.body.appendChild(msg);
    this.scrollToBottom();
    this.contextHistory.push({ role: 'user', content: text });
  }

  appendBotMessage(text, pills = null, customUI = null, allowVoice = true) {
    if (!this.body) return;

    const msg = document.createElement('div');
    msg.className = 'ai-message bot';

    const formattedText = this.formatMarkdown(text);
    let pillsHTML = '';
    if (pills && pills.length > 0) {
      pillsHTML = `
        <div class="ai-suggestions">
          ${pills.map(p => `<span class="ai-pill" data-pill="${p}">${p}</span>`).join('')}
        </div>
      `;
    }

    msg.innerHTML = `
      <div class="ai-avatar"><i class="fa-solid fa-brain"></i></div>
      <div class="ai-bubble">
        <div class="ai-text-content">${formattedText}</div>
        ${customUI ? customUI : ''}
        ${pillsHTML}
      </div>
    `;

    this.body.appendChild(msg);

    // Bind suggestion pill clicks
    const pillEls = msg.querySelectorAll('.ai-pill');
    pillEls.forEach(el => {
      el.addEventListener('click', () => {
        const query = el.getAttribute('data-pill');
        if (query) {
          this.appendUserMessage(query);
          this.processResponse(query);
        }
      });
    });

    this.scrollToBottom();
    this.contextHistory.push({ role: 'assistant', content: text });

    if (this.speechEnabled && allowVoice) {
      this.speakText(text.replace(/<[^>]*>/g, ''));
    }
  }

  showTypingIndicator() {
    if (!this.body) return null;
    const typing = document.createElement('div');
    typing.className = 'ai-message bot typing-indicator-msg';
    typing.innerHTML = `
      <div class="ai-avatar"><i class="fa-solid fa-brain"></i></div>
      <div class="ai-bubble" style="display: flex; gap: 4px; align-items: center;">
        <span class="voice-wave-bar"></span>
        <span class="voice-wave-bar"></span>
        <span class="voice-wave-bar"></span>
        <span style="font-size: 0.82rem; color: var(--white-alpha-70); margin-left: 6px;">STORM AI is computing...</span>
      </div>
    `;
    this.body.appendChild(typing);
    this.scrollToBottom();
    return typing;
  }

  removeTypingIndicator(el) {
    if (el && el.parentElement) {
      el.parentElement.removeChild(el);
    }
  }

  async processResponse(query) {
    const typingEl = this.showTypingIndicator();
    const qLower = query.toLowerCase();

    await new Promise(resolve => setTimeout(resolve, 800)); // Natural computing cadence
    this.removeTypingIndicator(typingEl);

    if (qLower.includes('hospital') || qLower.includes('health') || qLower.includes('mumcare') || qLower.includes('ehr') || qLower.includes('clinic')) {
      this.appendBotMessage(this.knowledgeBase.hospital.reply, this.knowledgeBase.hospital.pills);
      return;
    }

    if (qLower.includes('erp') || qLower.includes('sacco') || qLower.includes('bank') || qLower.includes('finance') || qLower.includes('accounting') || qLower.includes('tax') || qLower.includes('ictams')) {
      this.appendBotMessage(this.knowledgeBase.erp.reply, this.knowledgeBase.erp.pills);
      return;
    }

    if (qLower.includes('mobile') || qLower.includes('app') || qLower.includes('flutter') || qLower.includes('react native') || qLower.includes('relay')) {
      this.appendBotMessage(this.knowledgeBase.mobile.reply, this.knowledgeBase.mobile.pills);
      return;
    }

    if (qLower.includes('pricing') || qLower.includes('cost') || qLower.includes('estimate') || qLower.includes('quote') || qLower.includes('budget')) {
      const calcUI = `
        <div class="ai-interactive-card" style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid var(--orange-glow);">
          <label style="font-size: 0.8rem; color: var(--orange);">SELECT SYSTEM SCOPE:</label>
          <select id="calc-scope" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; background: #121216; color: #FFF; border: 1px solid var(--glass-border); border-radius: 6px;">
            <option value="45000">Enterprise Web Platform ($45k - $75k)</option>
            <option value="85000">Core Hospital/Banking ERP ($85k - $160k)</option>
            <option value="150000">National Sovereign Cloud OS ($150k - $300k+)</option>
          </select>
          <button class="btn btn-login" style="width: 100%; margin-top: 0.5rem;" onclick="alert('Proposal generated! Our Solutions Architect will follow up via email with complete SLA details.')">
            <i class="fa-solid fa-file-contract"></i> Generate Detailed Estimate
          </button>
        </div>
      `;
      this.appendBotMessage(this.knowledgeBase.pricing.reply, ['Book Technical Discovery', 'View Portfolio Architecture'], calcUI);
      return;
    }

    if (qLower.includes('meeting') || qLower.includes('consultation') || qLower.includes('book') || qLower.includes('schedule') || qLower.includes('calendar')) {
      const schedUI = `
        <div class="ai-interactive-card" style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid var(--orange-glow);">
          <div style="font-size: 0.85rem; margin-bottom: 0.5rem; color: #FFF;">Select Nairobi HQ Time Slot (EAT - UTC+3):</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <button class="ai-pill" style="text-align: center;">Tomorrow, 10:00 AM EAT</button>
            <button class="ai-pill" style="text-align: center;">Tomorrow, 3:00 PM EAT</button>
            <button class="ai-pill" style="text-align: center;">Thursday, 11:30 AM EAT</button>
            <button class="ai-pill" style="text-align: center;">Friday, 2:00 PM EAT</button>
          </div>
        </div>
      `;
      this.appendBotMessage(this.knowledgeBase.meeting.reply, ['Contact Nairobi Office', 'Request Email Proposal'], schedUI);
      return;
    }

    if (qLower.includes('code') || qLower.includes('c#') || qLower.includes('.net') || qLower.includes('api') || qLower.includes('snippet') || qLower.includes('demo')) {
      const codeUI = `
        <div style="margin-top: 0.75rem; background: #0A0A0E; border: 1px solid var(--glass-border); border-radius: 8px; overflow: hidden;">
          <div style="background: rgba(255,255,255,0.06); padding: 0.4rem 0.8rem; font-family: monospace; font-size: 0.75rem; color: var(--orange); display: flex; justify-content: space-between;">
            <span>C# .NET 8 production snippet</span>
            <span>Zero-Trust MTLS</span>
          </div>
          <pre style="padding: 0.8rem; font-size: 0.78rem; overflow-x: auto; color: #4ADE80;"><code>${this.escapeHtml(this.knowledgeBase.code.codeSnippet)}</code></pre>
        </div>
      `;
      this.appendBotMessage(this.knowledgeBase.code.reply, ['Explore DevOps Stack', 'View Security Architecture'], codeUI);
      return;
    }

    // Default intelligent knowledge base answer
    const defaultReply = `Digital Storm Technologies is an award-winning African engineering powerhouse. We craft sovereign enterprise software across **Healthcare, Finance, Agriculture, Education, Government, and Logistics** using **handcrafted .NET 8, Blazor, React, and PostgreSQL** architectures.\n\nHow can I assist your engineering roadmap today?`;
    this.appendBotMessage(defaultReply, [
      'Build Hospital System',
      'Need ERP',
      'Need Mobile App',
      'Pricing',
      'Book Consultation'
    ]);
  }

  toggleVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    if (this.isListening) {
      this.isListening = false;
      if (this.micBtn) this.micBtn.classList.remove('listening');
      return;
    }

    this.isListening = true;
    if (this.micBtn) this.micBtn.classList.add('listening');

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (this.input) {
        this.input.value = transcript;
        this.handleUserSubmit();
      }
    };

    recognition.onend = () => {
      this.isListening = false;
      if (this.micBtn) this.micBtn.classList.remove('listening');
    };

    recognition.start();
  }

  speakText(text) {
    if (!('speechSynthesis' in window) || !this.speechEnabled) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  scrollToBottom() {
    if (this.body) {
      this.body.scrollTop = this.body.scrollHeight;
    }
  }

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.StormAIAssistant = StormAIAssistant;

// Auto-init on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  window.stormAI = new StormAIAssistant();
});
