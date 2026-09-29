import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink, 
  User,
  Loader2
} from 'lucide-react';
import { ChatMessage, ChatEvidence } from '../../types';
import { CANNED_AI_QA, SAMPLE_CHAT_HISTORY } from '../../data/mockData';

interface AskMyPolicyChatProps {
  onViewEvidence: (evidence: any) => void;
}

export const AskMyPolicyChat: React.FC<AskMyPolicyChatProps> = ({ onViewEvidence }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_CHAT_HISTORY);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Is cataract surgery covered?',
    'Is knee replacement covered?',
    'What is my room-rent limit?',
    'Do I have a waiting period?',
    'What expenses are excluded?',
    'How much co-pay do I have?',
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiThinking]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isAiThinking) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAiThinking(true);
    setThinkingStep('Scanning policy document embeddings...');

    // Match query or fallback to intelligent clause synthesizer
    const normalized = query.toLowerCase();
    let matchedKey = Object.keys(CANNED_AI_QA).find(k => normalized.includes(k.replace('?', '')));

    setTimeout(() => {
      setThinkingStep('Analyzing Section 4.2 and sub-limit conditions...');
    }, 600);

    setTimeout(() => {
      setThinkingStep('Extracting verified clause evidence & verifying confidence...');
    }, 1200);

    setTimeout(() => {
      let aiResponse: { answer: string; evidence: ChatEvidence };

      if (matchedKey && CANNED_AI_QA[matchedKey]) {
        aiResponse = CANNED_AI_QA[matchedKey];
      } else {
        // Dynamic smart response for any other query
        aiResponse = {
          answer: `Based on your SecureHealth Plus contract, this procedure or query is governed by standard in-patient hospitalization terms (Section 2.1). Eligible treatments requiring medically necessary hospital stay over 24 hours are covered up to ₹10,00,000 Sum Insured, subject to the ₹5,000/day room rent cap, 10% co-payment for age 55+, and the ₹20,000 annual deductible.`,
          evidence: {
            sourcePage: 4,
            section: 'Section 2.1 — General Scope of In-patient Benefits',
            confidence: 'HIGH',
            clauseExcerpt: 'The Company shall indemnify reasonable and customary charges incurred towards hospitalization for medically necessary treatment up to the Sum Insured.',
            explanation: 'General surgical and medical treatments are admissible provided they are not listed under IRDAI non-payable exclusions (Section 8.1).'
          }
        };
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidence: aiResponse.evidence
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 1800);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-navy-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-200">
      {/* Top Chat Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-navy-900/70 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Ask anything about your policy</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Grounded in Policy PDF
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Answers are strictly grounded in your uploaded policy. Every response provides legal citations.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
          <span>Active Contract:</span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">SHP-9082-IND</span>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-6 py-2.5 bg-slate-100/60 dark:bg-navy-900/40 border-b border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center space-x-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex-shrink-0">
          Suggested:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isAiThinking}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start space-x-2.5 max-w-2xl">
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-3">
                {/* Bubble */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none font-medium'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none font-medium border border-slate-200 dark:border-slate-700'
                }`}>
                  {msg.text}
                </div>

                {/* Evidence Card attached to AI message */}
                {msg.evidence && (
                  <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-200/80 dark:border-amber-900/60">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <span className="font-bold text-amber-900 dark:text-amber-200">
                          POLICY EVIDENCE: Page {msg.evidence.sourcePage}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        CONFIDENCE: {msg.evidence.confidence}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                        {msg.evidence.section}
                      </span>
                      <blockquote className="p-2.5 rounded bg-white/80 dark:bg-slate-900/80 border-l-4 border-amber-500 text-slate-800 dark:text-amber-100 italic leading-relaxed font-serif text-xs">
                        "{msg.evidence.clauseExcerpt}"
                      </blockquote>
                    </div>

                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>AI Explanation:</strong> {msg.evidence.explanation}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onViewEvidence({
                          page: msg.evidence!.sourcePage,
                          section: msg.evidence!.section,
                          clauseText: msg.evidence!.clauseExcerpt,
                          simpleExplanation: msg.evidence!.explanation,
                          confidence: msg.evidence!.confidence
                        })}
                        className="px-3 py-1.5 rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-300 dark:hover:bg-amber-800 transition flex items-center gap-1.5 text-xs shadow-xs"
                      >
                        <span>View Policy Page {msg.evidence.sourcePage}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className={`text-[10px] text-slate-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* AI Thinking Animation */}
        {isAiThinking && (
          <div className="flex items-start space-x-2.5 max-w-xl">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{thinkingStep}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Searching 42 pages of SecureHealth Plus policy wordings...
              </p>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-850">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question about coverage, room rent, co-pay, or specific treatments..."
            disabled={isAiThinking}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isAiThinking}
            className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-brand-600/20 flex items-center space-x-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Supported by Policy Evidence • Never Hallucinates</span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
