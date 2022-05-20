# Static Site Template

A static website template project using 11ty and Parcel so I can reuse it for my projects.

## TODO
- [ ] More consistent naming scheme for directories
- [ ] Instead of using {{ Content }} maybe use blocks and includes https://stackoverflow.com/questions/35496514/nunjucks-blocks-defined-within-include-partial-file-ignored-by-extend
- [ ] Partials for footer / header etc
- [ ] Figure out how to run parcel with a different root
- [ ] Figure out how to input ts from separate directories
  - [ ] Also figure out how to import styles from different directories
      - [ ] Local styles for a certain page
      - [ ] Currently the `/styles` part of the url is hardcoded in base.njk. We can probably process the url with a transform too. Do something similar for ts.
        - **If I had different directories, I could just have a assets directory with the ts and scss following a similar structure to the contents dir**
        - What if I were to turn content into "templates/content, templates/styles, templates/scripts"
  - [ ] This would allow me to use 11tydata files again
  - [ ] Look into https://www.npmjs.com/package/eleventy-sass for extra directories (?)
  - [ ] Look into https://www.11ty.dev/docs/languages/custom/#compileoptions.permalink-to-override-permalink-compilation to override the path where the file gets generated (?)
- [ ] Create deployment pipelines
