# Server Drawer 120Hz

Modified 2026-11-25 from [Server Drawer v1.0.10, PR #12](https://github.com/Valenced/valenced-community-plugins/pull/12) at commit `8942e8d3375bc508b3b949e7d55fa9835f175250`. Original authors: kmmiio99o, Rosie, Benjii. GPL-3.0; see LICENSE. This is a modified, independent distribution; do not run alongside the original Server Drawer.

## Performance changes
- Android soft dock uses native-driver transform and opacity; fixed layout removes per-frame height/bottom/border updates. The resistance and spring remain, but Android no longer morphs the lower corners during soft expansion.
- Scroll state updates only when crossing the top boundary. Avatar resume uses a single idle deadline instead of restarting a timer and invoking a state setter for every scroll event. Animated avatars are opt-in by default.
- Memoized search/filter results for server, retained folder and DM lists; drag hover lookup is O(1) per tile rather than linear.
- Separate server, DM and selection store subscriptions. Navigation does not scan the server or DM collections, and unrelated store events no longer scan both collections. Each collection still fingerprints its own relevant store updates.
- Do not write session storage on expansion-only transitions.

## Build
Use the pinned upstream checkout, replace `plugins/server-drawer/` with this directory (excluding LICENSE and README if desired), and run the upstream build `./gradlew --no-daemon packageServerDrawer`. The upstream build requires Bun, Java 25 and access to its Gradle dependencies. Output is under `build/dist/`. Install the resulting ZIP only after the build succeeds; disable the original plugin first. No font files or repository index are modified.

## Verification
Static source review only; TypeScript compilation, Android runtime, and on-device 120 Hz frame pacing have not been verified. Frame budget is 8.33 ms; test repeated open/close, vertical and horizontal swipes, large DMs/server lists, folder drag/drop, and 120 Hz frame timing. GIF playback and Discord Flux snapshot scanning remain possible costs. No guaranteed FPS claim.

## v1.0.12 — 2026-11-25
One-pass reconciliation preserves unchanged guild/folder/DM objects, icon URLs and ordered arrays. Memoized cells resolve current actions and geometry at interaction time. Menus build once per store evaluation and resolve current actions. Closed folder lists are released on animation completion. Native drag coordinates and frame-coalesced hit testing reduce JS work; pan updates are batched and flushed before settling. All features remain available. Physical device frame timing is not verified.

## v1.0.13 — fast scroll
Use lightweight FlashList measurement cells matching the real row text and geometry; skip images, native menus and gesture recognizers during measurement. Render ahead by 400 dp (higher memory use possible). Reuse native menu data across recycled cells with store-version invalidation and independent anchors. Coalesce collection store changes during scrolling and refresh after 150 ms of idle or drawer close; badges, names and order may briefly lag while flinging. Keep selection updates immediate. All features retained; actual frame timing remains unmeasured.
