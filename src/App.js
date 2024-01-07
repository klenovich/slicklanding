import React, { useState, useEffect } from 'react';
import './App.css';
import '@fontsource-variable/inter';

function App() {
  // Brand constant displayed in the sidebar
  const brand = 'BRAND NAME';

  // Description below the brand in the sidebar
  const underBrand = '(underBrand) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';

  // The maximum number of pages to display
  const MAX_PAGES = 5;

  // Object defining page names keyed by their respective numbers
  const pageNames = {
    1: 'Page One',
    2: 'Page Two',
    3: 'Page Three',
    4: 'Page Four',
    5: 'Page Five'
  };

  // Object containing the content for each page
  const pages = {
    1: '(Page 1) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    2: '(Page 2) Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    3: '(Page 3) At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    4: '(Page 4) Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    5: '(Page 5) Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  };

  // State to keep track of the currently active page
  const [activePage, setActivePage] = useState(1);

  // State to keep track of the amount scrolled
  const [scrollAmount, setScrollAmount] = useState(0);

  // Amount of scroll needed to trigger a switch to the next page
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

        // Change the active page based on scroll amount
        if (updatedScrollAmount >= SCROLL_COOLDOWN) {
          // Move to the next page if possible
          setActivePage(prevPage => Math.min(prevPage + 1, MAX_PAGES));
        } else if (updatedScrollAmount <= -SCROLL_COOLDOWN) {
          // Move to the previous page if possible
          setActivePage(prevPage => Math.max(prevPage - 1, 1));
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
      {/* Sidebar that can shrink based on active page */}
      <div className={`sidebar ${activePage > 1 ? 'shrink' : ''}`}>
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
      {/* Main page display area */}
      <div className="page">
        {/* Navigation for pages */}
        <div className="page-navigation">
          {/* Dynamic creation of page navigation buttons */}
          {Object.keys(pageNames).map(pageKey => (
            <button
              key={pageKey}
              className={`page-button ${parseInt(pageKey, 10) === activePage ? 'active' : ''}`}
              onClick={() => setActivePage(parseInt(pageKey, 10))}
            >
              {pageNames[pageKey]}
            </button>
          ))}
        </div>
        {/* Content display for the active page */}
        <div className={`page-content page-${activePage}`}>
          {pages[activePage]}
        </div>
      </div>
    </div>
  );
}

export default App;