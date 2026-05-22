import { useState, useEffect } from 'react';
import './DedicationWall.css';
import { supabase } from '../lib/supabaseClient';
import DedicationForm from './DedicationForm';

export default function DedicationWall() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNewDedication = (newMsg) => {
    setMessages(prev => [...prev, newMsg]);
  };

  useEffect(() => {
    async function fetchDedications() {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('dedications')
            .select('*')
            .order('id', { ascending: true });
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            setMessages(data);
          } else {
            setMessages([]);
          }
        } catch (error) {
          console.error("Error fetching dedications:", error);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
      setLoading(false);
    }
    
    fetchDedications();
  }, []);

  return (
    <section className="wall-wrapper">
      <div className="wall-header">
        <h2>DEDICATORIAS</h2>
        <p>MEMORIAS QUE QUEDAN EN EL ASFALTO</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Cargando memorias...</p>
      ) : (
        <div className="wall-grid">
          {messages.map((msg, idx) => (
            <article 
              key={msg.id} 
              className="message-card"
              style={{ '--delay': `${idx * 0.2}s` }}
            >
              <p className="message-text">"{msg.text}"</p>
              <p className="message-author">— {msg.author}</p>
            </article>
          ))}
        </div>
      )}
      
      <DedicationForm onDedicationAdded={handleNewDedication} />
    </section>
  );
}
