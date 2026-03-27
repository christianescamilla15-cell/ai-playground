import React, { useState, useRef, useEffect, useCallback } from 'react'
import { generateAssistantResponse } from './assistantEngine.js'

/* ───────── Inline styles ───────── */
const S = {
  bubble: {
    position: 'fixed',
    bottom: 96,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366F1, #818CF8)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
    zIndex: 9990,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  bubbleHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 28px rgba(99,102,241,0.6)',
  },
  panel: {
    position: 'fixed',
    bottom: 96,
    right: 24,
    width: 400,
    height: 550,
    background: '#12131A',
    borderRadius: 16,
    border: '1px solid #2D2F45',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9990,
    overflow: 'hidden',
  },
  panelMobile: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    border: 'none',
  },
  header: {
    padding: '14px 16px',
    background: 'linear-gradient(135deg, #1A1B2E, #252745)',
    borderBottom: '1px solid #2D2F45',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366F1, #818CF8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  headerText: {
    color: '#E2E8F0',
    fontWeight: 700,
    fontSize: 14,
  },
  headerSub: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#9CA3AF',
    cursor: 'pointer',
    fontSize: 20,
    padding: '4px 8px',
    borderRadius: 6,
    lineHeight: 1,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  quickActions: {
    padding: '8px 14px',
    borderTop: '1px solid #1F2037',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    flexShrink: 0,
  },
  chip: {
    padding: '5px 10px',
    borderRadius: 14,
    border: '1px solid #374151',
    background: '#1A1B2E',
    color: '#C7D2FE',
    fontSize: 11,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.15s, border-color 0.15s',
  },
  chipHover: {
    background: '#252745',
    borderColor: '#6366F1',
  },
  inputArea: {
    padding: '10px 14px',
    borderTop: '1px solid #1F2037',
    display: 'flex',
    gap: 8,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #374151',
    background: '#1A1B2E',
    color: '#E2E8F0',
    fontSize: 13,
    outline: 'none',
  },
  sendBtn: {
    padding: '8px 14px',
    borderRadius: 10,
    border: 'none',
    background: '#6366F1',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  msgUser: {
    alignSelf: 'flex-end',
    background: '#6366F1',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '14px 14px 4px 14px',
    maxWidth: '80%',
    fontSize: 13,
    lineHeight: 1.5,
    wordBreak: 'break-word',
  },
  msgAssistant: {
    alignSelf: 'flex-start',
    background: '#1A1B2E',
    color: '#E2E8F0',
    padding: '10px 14px',
    borderRadius: '14px 14px 14px 4px',
    maxWidth: '85%',
    fontSize: 13,
    lineHeight: 1.6,
    wordBreak: 'break-word',
    border: '1px solid #2D2F45',
  },
  msgAgentic: {
    alignSelf: 'flex-start',
    background: '#1A1B2E',
    color: '#E2E8F0',
    padding: '10px 14px',
    borderRadius: '14px 14px 14px 4px',
    maxWidth: '85%',
    fontSize: 13,
    lineHeight: 1.6,
    wordBreak: 'break-word',
    border: '1px solid #7C3AED',
    boxShadow: '0 0 8px rgba(124,58,237,0.15)',
  },
  agenticBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 10,
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  followups: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 8,
  },
  followupChip: {
    padding: '4px 9px',
    borderRadius: 12,
    border: '1px solid #374151',
    background: 'transparent',
    color: '#818CF8',
    fontSize: 11,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  typingDots: {
    alignSelf: 'flex-start',
    background: '#1A1B2E',
    padding: '12px 18px',
    borderRadius: '14px 14px 14px 4px',
    border: '1px solid #2D2F45',
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#6366F1',
    animation: 'assistantBounce 1.4s infinite ease-in-out',
  },
  welcome: {
    textAlign: 'center',
    padding: '20px 10px',
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 1.6,
  },
}

/* ───────── Markdown-lite renderer ───────── */
function renderMarkdown(text) {
  if (!text) return null
  const lines = text.split('\n')
  const elements = []
  let key = 0

  for (const line of lines) {
    if (line.trim() === '') {
      elements.push(<br key={key++} />)
      continue
    }
    if (line.trim() === '---') {
      elements.push(<hr key={key++} style={{ border: 'none', borderTop: '1px solid #2D2F45', margin: '8px 0' }} />)
      continue
    }
    if (/^\s*[-*]\s/.test(line)) {
      const content = line.replace(/^\s*[-*]\s/, '')
      elements.push(
        <div key={key++} style={{ display: 'flex', gap: 6, marginLeft: 4 }}>
          <span style={{ color: '#6366F1', flexShrink: 0 }}>-</span>
          <span>{renderInline(content)}</span>
        </div>
      )
      continue
    }
    if (/^\d+\)\s/.test(line.trim())) {
      const content = line.replace(/^\s*\d+\)\s/, '')
      const num = line.trim().match(/^(\d+)\)/)[1]
      elements.push(
        <div key={key++} style={{ display: 'flex', gap: 6, marginLeft: 4 }}>
          <span style={{ color: '#6366F1', flexShrink: 0, fontWeight: 600 }}>{num})</span>
          <span>{renderInline(content)}</span>
        </div>
      )
      continue
    }
    elements.push(<div key={key++}>{renderInline(line)}</div>)
  }
  return elements
}

function renderInline(text) {
  // Bold **text**, inline code `code`, italic *text*
  const parts = []
  let remaining = text
  let idx = 0
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|\*(.+?)\*)/g
  let match
  let lastIndex = 0

  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={idx++}>{remaining.slice(lastIndex, match.index)}</span>)
    }
    if (match[2]) {
      parts.push(<strong key={idx++} style={{ color: '#C7D2FE' }}>{match[2]}</strong>)
    } else if (match[3]) {
      parts.push(<code key={idx++} style={{ background: '#252745', padding: '1px 5px', borderRadius: 4, fontSize: 12, color: '#A5B4FC' }}>{match[3]}</code>)
    } else if (match[4]) {
      parts.push(<em key={idx++} style={{ color: '#A5B4FC' }}>{match[4]}</em>)
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < remaining.length) {
    parts.push(<span key={idx++}>{remaining.slice(lastIndex)}</span>)
  }

  return parts.length > 0 ? parts : text
}

/* ───────── Component ───────── */
export default function PlaygroundAssistant({ lang = 'en' }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [bubbleHover, setBubbleHover] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [open])

  const sendMessage = useCallback((text) => {
    const msg = (text || input).trim()
    if (!msg) return
    setInput('')

    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)

    setTimeout(() => {
      const response = generateAssistantResponse(msg, lang)
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: response.text,
        mode: response.mode,
        topic: response.topic,
        confidence: response.confidence,
        suggestedFollowups: response.suggestedFollowups,
      }])
      setTyping(false)
    }, 400 + Math.random() * 400)
  }, [input, lang])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = lang === 'es'
    ? ['Que es esto?', 'Chat', 'Analisis', 'RAG', 'Traduccion', 'Comparar', 'Sorpresa', 'Ayuda']
    : ['What is this?', 'Chat', 'Analysis', 'RAG', 'Translation', 'Compare', 'Surprise', 'Help']

  const welcomeText = lang === 'es'
    ? 'Soy tu asistente de AI Playground.\nPreguntame sobre cualquiera de las 7 funciones de IA, o haz clic en una accion rapida abajo.'
    : 'I\'m your AI Playground assistant.\nAsk me about any of the 7 AI features, or click a quick action below.'

  // Bubble
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setBubbleHover(true)}
        onMouseLeave={() => setBubbleHover(false)}
        style={{ ...S.bubble, ...(bubbleHover ? S.bubbleHover : {}) }}
        aria-label={lang === 'es' ? 'Abrir asistente de AI Playground' : 'Open AI Playground assistant'}
        title={lang === 'es' ? 'Asistente de AI Playground' : 'AI Playground Assistant'}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    )
  }

  // Panel
  const panelStyle = isMobile
    ? { ...S.panel, ...S.panelMobile }
    : S.panel

  return (
    <>
      {/* Keyframe animation for typing dots */}
      <style>{`
        @keyframes assistantBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div style={panelStyle} role="dialog" aria-label={lang === 'es' ? 'Asistente de AI Playground' : 'AI Playground Assistant'}>
        {/* Header */}
        <div style={S.header}>
          <div style={S.headerTitle}>
            <div style={S.headerIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div style={S.headerText}>AI Playground Assistant</div>
              <div style={S.headerSub}>{lang === 'es' ? '40+ temas | EN/ES' : '40+ topics | EN/ES'}</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={S.closeBtn}
            aria-label={lang === 'es' ? 'Cerrar asistente' : 'Close assistant'}
          >
            &#x2715;
          </button>
        </div>

        {/* Messages */}
        <div style={S.messages}>
          {messages.length === 0 && (
            <div style={S.welcome}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              {welcomeText.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          {messages.map((msg, i) => {
            if (msg.role === 'user') {
              return <div key={i} style={S.msgUser}>{msg.text}</div>
            }
            const isAgentic = msg.mode === 'agentic'
            return (
              <div key={i}>
                <div style={isAgentic ? S.msgAgentic : S.msgAssistant}>
                  {isAgentic && (
                    <div style={{ marginBottom: 4 }}>
                      <span style={S.agenticBadge}>
                        {lang === 'es' ? 'Modo Agente' : 'Agentic Mode'}
                      </span>
                    </div>
                  )}
                  <div>{renderMarkdown(msg.text)}</div>
                </div>
                {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                  <div style={S.followups}>
                    {msg.suggestedFollowups.map((f, j) => (
                      <button
                        key={j}
                        style={S.followupChip}
                        onClick={() => sendMessage(f)}
                        onMouseEnter={e => { e.target.style.background = '#252745' }}
                        onMouseLeave={e => { e.target.style.background = 'transparent' }}
                        aria-label={`${lang === 'es' ? 'Preguntar' : 'Ask'}: ${f}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {typing && (
            <div style={S.typingDots}>
              <div style={{ ...S.dot, animationDelay: '0s' }} />
              <div style={{ ...S.dot, animationDelay: '0.2s' }} />
              <div style={{ ...S.dot, animationDelay: '0.4s' }} />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Actions */}
        <div style={S.quickActions}>
          {quickActions.map((action, i) => (
            <button
              key={i}
              style={S.chip}
              onClick={() => sendMessage(action)}
              onMouseEnter={e => { e.target.style.background = '#252745'; e.target.style.borderColor = '#6366F1' }}
              onMouseLeave={e => { e.target.style.background = '#1A1B2E'; e.target.style.borderColor = '#374151' }}
              aria-label={`${lang === 'es' ? 'Preguntar sobre' : 'Ask about'} ${action}`}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={S.inputArea}>
          <input
            ref={inputRef}
            style={S.input}
            placeholder={lang === 'es' ? 'Pregunta algo...' : 'Ask anything...'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={lang === 'es' ? 'Escribe tu pregunta' : 'Type your question'}
          />
          <button
            style={S.sendBtn}
            onClick={() => sendMessage()}
            aria-label={lang === 'es' ? 'Enviar mensaje' : 'Send message'}
          >
            {lang === 'es' ? 'Enviar' : 'Send'}
          </button>
        </div>
      </div>
    </>
  )
}
