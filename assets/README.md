# assets folder

Drop your media files here, then point the site at them.

Suggested files:
- `intro.mp4` — the welcome video shown in the hero on the home page
- `portrait.jpg` — your photo for the About section
- `piece-1.jpg`, `piece-2.jpg`, … — your artwork images

## Add your hero video
In `index.html`, find the comment `TO ADD YOUR VIDEO` and replace the placeholder
contents inside `.video-frame` with:

```html
<video src="assets/intro.mp4" autoplay muted loop playsinline></video>
```

## Add an artwork image
In any gallery card, find `TO ADD IMAGE` and replace the placeholder `<div>` with:

```html
<img src="assets/piece-1.jpg" alt="Title of the piece" />
```

Tip: keep images under ~500 KB each (resize/compress) so the site loads fast.
