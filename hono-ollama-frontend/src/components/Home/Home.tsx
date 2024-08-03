import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';


const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/chat');
  };

  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Yapay Zeka Sohbet Uygulamasına Hoş Geldiniz</h1>
          <p>Harika yapay zeka robotu</p>
          <button className="cta-button" onClick={handleGetStarted}>Başlayın</button>
        </div>

      </section>

      <section className="features">
        <h2>Ana Özellikler</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Hızlı Performans</h3>
            <p>Optimize edilmiş kodumuzla inanılmaz hız deneyimini yaşayın.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3>Güvenli</h3>
            <p>Verilerinizi güvende tutmak için en üst düzey güvenlik özellikleri.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌐</div>
            <h3>Küresel Erişim</h3>
            <p>Verilerinize dünyanın her yerinden erişin.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💡</div>
            <h3>Yenilikçi</h3>
            <p>Sizi önde tutacak en son özellikler.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👨‍💻</div>
            <h3>Kullanıcı Dostu</h3>
            <p>Herkesin kolayca kullanabileceği sezgisel tasarım.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <h3>Ölçeklenebilir</h3>
            <p>İşinizi büyütün ve ölçeklenebilirlik konusunda endişelenmeyin.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
