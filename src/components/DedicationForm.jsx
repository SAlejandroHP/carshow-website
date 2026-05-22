import { useState } from 'react';
import './DedicationForm.css';
import { supabase } from '../lib/supabaseClient';

export default function DedicationForm({ onDedicationAdded }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('dedications')
          .insert([
            { author: author.trim(), text: text.trim() }
          ])
          .select();

        if (error) throw error;

        setStatus('success');
        setAuthor('');
        setText('');
        
        if (onDedicationAdded && data && data.length > 0) {
          onDedicationAdded(data[0]);
        }
      } else {
        // Fallback behavior if no supabase
        setStatus('success');
        if (onDedicationAdded) {
          onDedicationAdded({
            id: Date.now(),
            author: author.trim(),
            text: text.trim()
          });
        }
        setAuthor('');
        setText('');
      }
    } catch (err) {
      console.error('Error adding dedication:', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after a few seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  };

  return (
    <div className="dedication-form-wrapper">
      <div className="form-header">
        <h3>DEJA TU MEMORIA</h3>
      </div>
      <form onSubmit={handleSubmit} className="dedication-form">
        <div className="form-group">
          <label htmlFor="author">TU NOMBRE</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Escribe tu nombre..."
            maxLength={50}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">TU MENSAJE</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comparte tu memoria o dedicatoria..."
            rows={4}
            maxLength={300}
            required
            disabled={isSubmitting}
          />
          <div className="char-count">
            {text.length}/300
          </div>
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting || !author.trim() || !text.trim()}
        >
          {isSubmitting ? 'ENVIANDO...' : 'PUBLICAR MEMORIA'}
        </button>
        
        {status === 'success' && (
          <p className="status-message success">¡Memoria publicada con éxito!</p>
        )}
        {status === 'error' && (
          <p className="status-message error">Hubo un error al publicar. Intenta de nuevo.</p>
        )}
      </form>
    </div>
  );
}
