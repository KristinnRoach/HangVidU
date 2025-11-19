# Layout System

Modern, container query-ready layout system for flexible, responsive components.

## Container Queries

Container queries allow components to respond to their container's size rather than the viewport size. This enables truly modular, reusable components.

### Wrappers

**`.main-wrapper`** - Full viewport container

- `container-type: size` - Queries both width and height
- `container-name: main`

**`.relative-wrapper`** - Content container

- `container-type: inline-size` - Queries width only
- `container-name: content`

### Usage Example

```css
/* Component responds to its container, not viewport */
@container (min-width: 600px) {
  .my-component {
    flex-direction: row;
  }
}

/* Named container queries */
@container main (min-width: 800px) {
  .my-component {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Layout Utilities

### Flexbox

- `.flex-row` - Horizontal flex layout
- `.flex-col` - Vertical flex layout
- `.flex-start`, `.flex-end`, `.flex-between`, `.flex-around` - Justify modifiers
- `.flex-wrap` - Enable wrapping

### Container-Responsive Classes

- `.container-md:flex-row` - Horizontal at 600px+ container width
- `.container-lg:flex-row` - Horizontal at 800px+ container width
- `.container-responsive` - Smooth transitions for container changes

## Layout Animations

### Automatic Animations

Container-responsive classes (`.container-md:*`, `.container-lg:*`) automatically animate layout shifts with smooth transitions.

### Manual Animation Control

Add `.layout-animated` to any element for smooth transitions on layout changes:

```html
<div class="flex-col layout-animated">
  <!-- Smoothly transitions when flex-direction changes -->
</div>
```

Animates: `flex-direction`, `gap`, `padding`, `margin`, `width`, `height`

### Custom Container Query Animations

```css
.my-element {
  transition: flex-direction var(--duration-default) var(--easing-default);
}

@container (min-width: 600px) {
  .my-element {
    flex-direction: row;
  }
}
```

### Speed Modifiers

Use animation speed classes from animations.css:

- `.fast` - 100ms transitions
- Default - 200ms transitions
- `.slow` - 400ms transitions

**Note:** All layout animations respect `prefers-reduced-motion` for accessibility.

## Browser Support

Container queries are widely supported in modern browsers (2023+):

- Chrome 105+
- Safari 16+
- Firefox 110+

For older browsers, styles gracefully degrade to default values.
