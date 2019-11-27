# React Offline Test

## Libraries added

* axios
* prop-types
* react-test-renderer (for unit tests)
* css-loader (for webpack)
* normalize.css

## Thoughts
I went with a simple design using purely css. It's responsive and a mobile first solution.

For testing I used Jest with React Test Renderer. I tested more for functionality than styles, as I thought something like Cypress would be more suited for that.

Also with regarding to fetching data. Usually I would use async/await, however the instructions mentioned to use ES7 or earlier, so I was unsure whether I could use it in the solution (async/await was introduced in ES8). I did however use it in my tests for asynchronous acts in order to settle the state changes.

It took me in total around 4 hours. I got the functionality and the tests for the services and stateless components up in about 1.5 hours; but it took me a little longer to write the tests for the hooks, because I was trying to figure out a way to suppress the act warnings without the use of async or introducing a new library react React Hooks Test Library.

Overall it was a nice coding test and I really enjoyed it.
