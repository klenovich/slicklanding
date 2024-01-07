# slicklanding

Relatively simple scrollable landing page built in React for [fund.codes](https://fund.codes) and [SmartVenue](https://smartvenue.one) while these applications are under development.

Responsive single page webapp. On desktop there are three columns:

*Left:*
brand (site title)
underBrand (subTitle / short description)
email field
subscription button

*Center*
Current selected or scrolled pageView

*Right*
Page Navigation / List of Pages


On page scroll the site will advance / return to the page in direction of input scroll. Thresholds for this are adjustable as:
```
  const SCROLL_THRESHOLD = 300;
  const SCROLL_COOLDOWN = 700;
```