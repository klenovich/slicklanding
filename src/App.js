import React, { useState, useEffect } from 'react';
import './App.css';
import '@fontsource-variable/inter';

function App() {
  // Brand constant displayed in the sidebar
  const brand = 'BRAND NAME';

  // Description below the brand in the sidebar
  const underBrand = '(underBrand) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';

  // The maximum number of pages to display
  const MAX_FEATURES = 5;

  // Object defining page names keyed by their respective numbers
  const featureNames = {
    1: 'Page One',
    2: 'Page Two',
    3: 'Page Three',
    4: 'Page Four',
    5: 'Page Five'
  };

  // Object containing the content for each page
  const features = {
    1: '(Page 1) Lorem ipsum...',
    2: '(Page 2) Sed ut perspiciatis...',
    3: '(Page 3) At vero eos...',
    4: '(Page 4) Nam libero tempore...',
    5: '(Page 5) Ut enim ad minima veniam...'
  };

  // State to keep track of the currently active feature
  const [activeFeature, setActiveFeature] = useState(1);

  // State to keep track of the amount scrolled
  const [scrollAmount, setScrollAmount] = useState(0);

  // Amount of scroll needed to trigger a switch to the next feature
  const SCROLL_THRESHOLD = 300;

  // Amount of scroll before a cooldown is implemented
  const SCROLL_COOLDOWN = 700;

  // Effect hook to handle mouse wheel scroll events
  useEffect(() => {
    const handleScroll = event => {
      // Updating scroll amount based on user scroll action and apply boundaries
      setScrollAmount(prevScrollAmount => {
        const updatedScrollAmount = Math.min(
          Math.max(prevScrollAmount + event.deltaY, -SCROLL_COOLDOWN),
          SCROLL_COOLDOWN
        );

        // Change the active feature based on scroll amount
        if (updatedScrollAmount >= SCROLL_COOLDOWN) {
          // Move to the next feature if possible
          setActiveFeature(prevFeature => Math.min(prevFeature + 1, MAX_FEATURES));
        } else if (updatedScrollAmount <= -SCROLL_COOLDOWN) {
          // Move to the previous feature if possible
          setActiveFeature(prevFeature => Math.max(prevFeature - 1, 1));
        }

        // Reset scroll amount if threshold is reached, otherwise keep updated amount
        return Math.abs(updatedScrollAmount) >= SCROLL_COOLDOWN ? 0 : updatedScrollAmount;
      });

      // Prevent default scroll action when over the SCROLL_THRESHOLD
      if (Math.abs(scrollAmount) >= SCROLL_THRESHOLD) {
        event.preventDefault();
      }
    };

    // Add the scroll event listener to the window
    window.addEventListener('wheel', handleScroll);

    // Cleanup function to remove the event listener on component unmount
    return () => window.removeEventListener('wheel', handleScroll);
  }, [scrollAmount]); // Dependency array includes scrollAmount to update effect when it changes

  return (
    <div className="app">
      {/* Sidebar that can shrink based on active feature */}
      <div className={`sidebar ${activeFeature > 1 ? 'shrink' : ''}`}>
        {/* Brand name display */}
        <div className="brand">{brand}</div>
        {/* Static description under the brand name */}
        <div className="development">
          {underBrand}
        </div>
        {/* Subscription input field */}
        <input type="email" placeholder="Email" />
        {/* Subscription button */}
        <button className="subscribe">Subscribe</button>
      </div>
      {/* Main feature display area */}
      <div className="feature">
        {/* Navigation for features */}
        <div className="feature-navigation">
          {/* Dynamic creation of feature navigation buttons */}
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
        {/* Content display for the active feature */}
        <div className={`feature-content feature-${activeFeature}`}>
          {features[activeFeature]}
        </div>
      </div>
    </div>
  );
}

export default App;