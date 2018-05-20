/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', () => {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loops through each feed in the allFeeds object
     * and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it("has URL", () => {
      allFeeds.forEach(function(index) {
        expect(index.url).toBeDefined();
        expect(index.url.length).not.toBe(0);
      });
    });

    /* Loops through each feed in the allFeeds object
     * and ensures it has a name defined
     * and that the name is not empty.
     */
    it("has name", () => {
      allFeeds.forEach(function(index) {
        expect(index.name).toBeDefined();
        expect(index.name.length).not.toBe(0);
      });
    });

  });

  /* Write a new test suite named "The menu" */
  describe('The menu', () => {

    /* This test makes sure the menu element is
     * hidden by default.
     */
    it('menu hidden by default', () => {
      expect(document.querySelector('body').className).toContain("menu-hidden");
    });
    /* Test ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('menu changes on click', () => {
      document.querySelector('.menu-icon-link').click();
      expect(document.querySelector('body').className).not.toContain("menu-hidden");
      document.querySelector('.menu-icon-link').click();
      expect(document.querySelector('body').className).toContain("menu-hidden");
    })
  });

  /* Write a new test suite named "Initial Entries" */
  describe('Initial Entries', () => {
    /* Test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach((done) => {
      loadFeed(0, function() {
        done();
      });
    });

    it('at least one entry in .feed container when loadFeed is called', function(done) {
      expect(document.querySelector('.feed').querySelectorAll('.entry').length).not.toBe(0);
      done();
    });
  });

  /*Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', () => {
    /* Test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    let feed = undefined;

    beforeEach((done) => {
      loadFeed(0, function() {
        let feed = document.querySelector('.feed').innerHTML;
        loadFeed(1, function() {
          done();
        });
      });
    });

    it('new feed is loaded', (done) => {
      let newFeed = document.querySelector('.feed').innerHTML;
      expect(feed).not.toBe(newFeed);
      done();
    });

  });
}());
