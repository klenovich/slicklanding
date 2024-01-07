import React, { useState, useEffect } from 'react';
import './App.css';
import '@fontsource-variable/inter';

function App() {

  const MAX_FEATURES = 4;

  const featureNames = {
    1: 'About',
    2: 'Fundraising',
    3: 'Dashboard',
    4: 'Links'
  };

  const features = {
    1: 'Fund.codes is a platform that simplifies online fundraising. It allows organizations and individuals to easily set up a dedicated event page for their philanthropic causes. Each event page is given its own URL, serving as a one-stop destination where donors can find all the information they need, monitor the fundraiser\'s progress, and contribute without complication. Fund.codes is about removing barriers so that supporting a good cause is as simple and straightforward as it should be.',
    2: 'When it comes to raising money, it\'s the personal connections that count. With Fund.codes, each team member can have their own fundraising page. It\'s more than just collecting funds – it\'s about bringing people together to support a shared goal. Whether it\'s energizing the newest volunteers or tapping into the broad network of alumni, the platform ensures that everyone involved can share their individual stories and make a personal impact.',
    3: 'Every fundraising campaign needs a clear strategy and a way to track progress. The Dashboard on Fund.codes provides this vision and control. It simplifies complex tasks and offers a clear overview of the campaign\'s status. From the Dashboard, organizers can not only track the campaign\'s progress but also launch new initiatives and appreciate the collective contributions of their community. It represents your mission\'s story as it unfolds, offering real-time insights and management capabilities.',
    4: 'With Fund.codes, sharing your fundraiser is as straightforward as it gets. Rather than dealing with long and confusing web addresses, we provide short, memorable links. It\'s about making it easy for anyone to find your page and support your cause. Think of it like giving someone a direct line to your event – no fuss, no hassle. Just a simple link that packs all the punch you need to spread the word effectively.'
  };

  const [activeFeature, setActiveFeature] = useState(1);
  const [scrollAmount, setScrollAmount] = useState(0);
  const SCROLL_THRESHOLD = 300;
  const SCROLL_COOLDOWN = 700;

  useEffect(() => {
    const handleScroll = event => {
      setScrollAmount(prevScrollAmount => {
        const updatedScrollAmount = Math.min(
          Math.max(prevScrollAmount + event.deltaY, -SCROLL_COOLDOWN),
          SCROLL_COOLDOWN
        );

        if (updatedScrollAmount >= SCROLL_COOLDOWN) {
          setActiveFeature(prevFeature => Math.min(prevFeature + 1, MAX_FEATURES));
        } else if (updatedScrollAmount <= -SCROLL_COOLDOWN) {
          setActiveFeature(prevFeature => Math.max(prevFeature - 1, 1));
        }

        return Math.abs(updatedScrollAmount) >= SCROLL_COOLDOWN ? 0 : updatedScrollAmount;
      });

      if (Math.abs(scrollAmount) >= SCROLL_THRESHOLD) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [scrollAmount]);

  return (
    <div className="app">
      <div className={`sidebar ${activeFeature > 1 ? 'shrink' : ''}`}>
        <div className="brand">fund.codes</div>
        <div className="development">
          is currently in development. enter your email below to be the first to hear about updates.
        </div>
        <input type="email" placeholder="Email" />
        <button className="subscribe">Subscribe</button>
      </div>
      <div className="feature">
        <div className="feature-navigation">
          {Object.keys(featureNames).map(featureKey => (
            <button
              key={featureKey}
              className={`feature-button ${parseInt(featureKey, 10) === activeFeature ? 'active' : ''}`}
              onClick={() => setActiveFeature(parseInt(featureKey, 10))}
            >
              {featureNames[featureKey]}
            </button>
          ))}
        </div>
        <div className={`feature-content feature-${activeFeature}`}>
          {features[activeFeature]}
        </div>
      </div>
    </div>
  );
}

export default App;