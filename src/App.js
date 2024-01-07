import React, { useState, useEffect } from 'react';
import './App.css';
import '@fontsource-variable/inter';

function App() {

  const brand = 'BRAND NAME';

  const underBrand = '(underBrand) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

  const MAX_FEATURES = 5;

  const featureNames = {
    1: 'Page One',
    2: 'Page Two',
    3: 'Page Three',
    4: 'Page Four',
    5: 'Page Five'
  };

  const features = {
    1: '(Page 1) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    2: '(Page 2) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    3: '(Page 3) At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    4: '(Page 4) Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    5: '(Page 5) Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
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
        <div className="brand">{brand}</div>
        <div className="development">
          {underBrand}
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