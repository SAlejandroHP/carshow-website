import './Story.css';
import storyImg from '../assets/img-tsuru/tsuru-2.jpg';
import { storyTexts } from '../data/tsuruData';

export default function Story() {
  return (
    <section className="story-container">
      <div className="story-sticky-bg">
        <img src={storyImg} alt="Tsuru detail" className="story-img" />
        <div className="story-overlay"></div>
      </div>
      
      <div className="story-content">
        {storyTexts.map((text, idx) => (
          <article key={idx} className="story-block">
            <p className="story-text">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
