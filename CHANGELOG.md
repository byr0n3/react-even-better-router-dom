# Changelog

## v0.1.3

- Added `postNavigation` and `postNavigationFocus` attributes to `Router` component
    - `postNavigation` is used to control the scroll behavior after navigating to a different page
    - `postNavigationFocus` is used to control what element should be focussed after navigating to a different page
- Exported `flusher` helper

## v0.1.2

- Some more code refactoring
- Removed/inlined some imports & exports

## v0.1.1

- Small code refactors

## v0.1.0

- Fixed bug where the `Link` component sometimes wouldn't work
    - When the `children` prop of the `Link` component contained another element, the event target would be the child
      element.
- Bumped to first `v0.x` version

## v0.0.2

- Routing overhaul
- Support for route parameters (example: `/projects/1`)

## v0.0.1

- Basic, functional routing solution

## v0.0.0

- Empty repository with empty TypeScript project
