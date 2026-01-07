import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp, Search, HelpCircle, Phone, Mail, Sparkles, TrendingUp, Users } from "lucide-react"
import "../css/FAQ.css"

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCount, setFilteredCount] = useState(0)

  const toggleFAQ = useCallback((index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }, [activeIndex])

  const faqs = [
    {
      question: "HOW MUCH IS A FURNISHED RENTAL IN MEDELLIN?",
      answer: "It all depends: Views? Rooftop pool? AC? Location? 50-250 meters? While we have many sub-$1000 USD apartment rentals in Laureles, most of our Poblado inventory falls within $1250-$2000 per month. Luxury penthouse rentals can range from $2000-$6000. Daily rentals can range from $50 all the way up to $350/night in some outstanding units in the Energy Living Medellin building!",
      tags: ["Pricing", "Rentals", "Medellin", "Luxury"]
    },
    {
      question: "DO I HAVE TO SIGN AN APARTMENT RENTAL CONTRACT?",
      answer: "Yes, all rentals require a signed contract for legal protection of both parties. Our contracts are bilingual (Spanish/English) and clearly outline terms, conditions, and responsibilities. We offer flexible contract durations from 1 month to 2 years.",
      tags: ["Contracts", "Legal", "Rentals", "Documents"]
    },
    {
      question: "WHAT IS THE CASACOL GUEST POLICY?",
      answer: "Primary guests may host visitors during daytime hours (9 AM - 9 PM). Overnight guests require prior notification and may incur additional charges for extended stays. Maximum of 2 overnight guests per apartment, with a maximum stay of 3 consecutive nights.",
      tags: ["Guests", "Policy", "Rules", "Visitors"]
    },
    {
      question: "WHAT IS YOUR REFUND AND DEPOSIT POLICY?",
      answer: "Security deposits equal to one month's rent are required. Deposits are fully refundable within 14 days of checkout, pending property inspection. Cancellations made 30+ days before arrival receive full refund, 14-30 days receive 50% refund, under 14 days are non-refundable.",
      tags: ["Refunds", "Deposits", "Fees", "Cancellations"]
    },
    {
      question: "HOW SAFE IS IT FOR FOREIGNERS IN MEDELLIN?",
      answer: "Medellin has transformed into one of Latin America's safest cities. However, we recommend standard precautions: avoid displaying valuables, use registered taxis, and stay in recommended neighborhoods. All our properties have 24/7 security and are located in safe areas.",
      tags: ["Safety", "Foreigners", "Medellin", "Security"]
    },
    {
      question: "WHAT RENTAL LOCATIONS DO YOU OFFER IN MEDELLIN?",
      answer: "We offer properties in El Poblado (upscale), Laureles (local vibe), Envigado (family-friendly), Sabaneta (authentic), and Belén (budget-friendly). Each area has unique characteristics - our agents can help you choose based on your preferences and lifestyle.",
      tags: ["Locations", "Neighborhoods", "Medellin", "Areas"]
    },
    {
      question: "DO YOU OFFER UNFURNISHED RENTALS?",
      answer: "Yes! We offer both furnished and unfurnished options. Furnished units include all furniture, appliances, kitchenware, and linens. Unfurnished units provide basic appliances only. Minimum lease for unfurnished is 12 months, while furnished can be as short as 1 month.",
      tags: ["Unfurnished", "Furnished", "Options", "Flexibility"]
    },
  ]

  const handleTagClick = (tag) => {
    setSearchTerm(tag)
  }

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Escape') {
      setSearchTerm('')
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      document.querySelector('.search-input')?.focus()
    }
  }, [])

  useEffect(() => {
    const filtered = searchTerm 
      ? faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : faqs
    setFilteredCount(filtered.length)
  }, [searchTerm, faqs])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const filteredFAQs = searchTerm 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : faqs

  return (
    <div className="faqs-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
        <Sparkles size={28} style={{ color: 'var(--airbnb-red)' }} />
        <h1>Frequently Asked Questions</h1>
        <Sparkles size={28} style={{ color: 'var(--airbnb-red)' }} />
      </div>
      
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--airbnb-gray)', 
        fontSize: '1.1rem', 
        maxWidth: '700px', 
        margin: '0 auto 50px',
        lineHeight: '1.6'
      }}>
        Find quick answers to common questions about rentals, policies, safety, and more in Medellín.
      </p>

      {/* Enhanced Search Bar */}
      <div className="faq-search">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search for answers... (Press Ctrl+K to focus)"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <span style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--airbnb-red)',
            fontSize: '0.9rem',
            fontWeight: '600',
            background: 'rgba(255, 56, 92, 0.1)',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            {filteredCount} result{filteredCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Enhanced Stats */}
      <div className="faq-stats">
        <div className="stat-item">
          <TrendingUp size={28} style={{ marginBottom: '10px', color: 'var(--airbnb-red)' }} />
          <span className="stat-number">{faqs.length}+</span>
          <span className="stat-label">Questions Answered</span>
        </div>
        <div className="stat-item">
          <Users size={28} style={{ marginBottom: '10px', color: 'var(--airbnb-teal)' }} />
          <span className="stat-number">24/7</span>
          <span className="stat-label">Live Support</span>
        </div>
        <div className="stat-item">
          <Sparkles size={28} style={{ marginBottom: '10px', color: 'var(--airbnb-purple)' }} />
          <span className="stat-number">100%</span>
          <span className="stat-label">Verified Answers</span>
        </div>
      </div>

      {/* Popular Tags */}
      <div style={{ 
        marginBottom: '40px', 
        textAlign: 'center',
        animation: 'fadeInUp 0.8s ease-out 0.7s both'
      }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          color: 'var(--airbnb-dark)', 
          marginBottom: '15px',
          fontWeight: '600'
        }}>
          Popular Topics:
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {['Rentals', 'Pricing', 'Safety', 'Contracts', 'Medellin'].map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              style={{
                padding: '8px 20px',
                background: 'transparent',
                border: `2px solid ${tag === searchTerm ? 'var(--airbnb-red)' : 'var(--airbnb-light-gray)'}`,
                borderRadius: '25px',
                color: tag === searchTerm ? 'var(--airbnb-red)' : 'var(--airbnb-gray)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 56, 92, 0.05)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="faqs-list">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h2>{faq.question}</h2>
                <div className="faq-icon">
                  {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
                <p>{faq.answer}</p>
                <div className="faq-tags">
                  {faq.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="faq-tag"
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <HelpCircle size={60} />
            <h3 style={{ margin: '20px 0 10px', color: 'var(--airbnb-dark)' }}>
              No results found for "{searchTerm}"
            </h3>
            <p>Try searching with different keywords or browse popular topics above.</p>
            <button
              onClick={() => setSearchTerm('')}
              style={{
                marginTop: '20px',
                padding: '12px 30px',
                background: 'var(--airbnb-lighter-gray)',
                border: 'none',
                borderRadius: '25px',
                color: 'var(--airbnb-dark)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--airbnb-light-gray)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--airbnb-lighter-gray)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Help Section */}
      <div className="faq-help">
        <HelpCircle size={48} style={{ marginBottom: '20px', color: 'var(--airbnb-red)' }} />
        <h3>Still have questions?</h3>
        <p>Our dedicated support team is available 24/7 to assist you with any additional questions or concerns about renting in Medellín.</p>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center', 
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <a href="tel:+573001234567" className="contact-button">
            <Phone size={22} />
            Call Now
          </a>
          <a href="https://wa.me/573001234567" className="contact-button" style={{ background: 'var(--gradient-secondary)' }}>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>WhatsApp</span>
          </a>
          <a href="mailto:support@casacol.com" className="contact-button" style={{ background: 'var(--airbnb-teal)' }}>
            <Mail size={22} />
            Email Us
          </a>
        </div>
        
        <p style={{ 
          marginTop: '25px', 
          fontSize: '0.9rem', 
          color: 'var(--airbnb-gray)',
          opacity: 0.8
        }}>
          Average response time: <strong>15 minutes</strong> • Available in English & Spanish
        </p>
      </div>
    </div>
  )
}