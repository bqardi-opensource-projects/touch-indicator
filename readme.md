# Touch Indicator
(Browser function) Animated indicator when touching/clicking on an HTML element.

Example image with a round indicator:

![Example button with indicator](example.jpg)

## Import
```javascript
import touchIndicator from "https://unpkg.com/touch-indicator";
```

## Usage

Give this class: `touchIndicator` to every HTML element on your webpage you want this feature on:
```html
<div class="touchIndicator">
    <!-- My content -->
</div>
```
And call the function:
```javascript
touchIndicator();
```

That's it! Simple, right?

## Options
Well, there is more, don't worry.
There is a good amount of options you can change/configure.

To change an option, pass in an object as an argument with the properties you want changed, for example:

```javascript
touchIndicator({name: "myIndicator", color: "#ff0000"});
```
The options (`name` and `color`) will change the color of the indicator to a red color and set the name to `myIndicator`, which means that you must now set all HTML element's class names to `myIndicator` (well, all those you want this effect on):
```html
<div class="myIndicator">
    <!-- My content -->
</div>
```

Here is a function call with all possible options set (set with their default values for you to change):
```javascript
touchIndicator({
    // The name for the HTML element's class:
    name: "touchIndicator",
    // The duration of the animation:
    duration: 500,
    // Size of the indicator (at the end of the animation):
    size: 150,
    // The start opacity (ends at 0):
    opacity: 0.3,
    // The start transform scale value (ends at 1):
    scale: 0.2,
    // The color of the indicator:
    color: "#fff",
    // Show a square indicator instead of the round one:
    square: false,
    // Define a delay in ms for when to start the animation:
    delay: 0,
    // Create a ripple effect by defining number of ripples:
    ripples: 1,
    // The time in ms between each ripple effect:
    interval: 100
});
```