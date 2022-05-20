# Static Site Template

A static website template project using 11ty and Parcel so I can reuse it for my projects.

## TODO
- [ ] More consistent naming scheme for directories
- [ ] Instead of using {{ Content }} maybe use blocks and includes https://stackoverflow.com/questions/35496514/nunjucks-blocks-defined-within-include-partial-file-ignored-by-extend
- [ ] Partials for footer / header etc
- [ ] Figure out how to run parcel with a different root
- [ ] Figure out how to input ts from separate directories
  - [ ] This would allow me to use 11tydata files again
  - [ ] Look into https://www.npmjs.com/package/eleventy-sass for extra directories (?)
  - [ ] Look into https://www.11ty.dev/docs/languages/custom/#compileoptions.permalink-to-override-permalink-compilation to override the path where the file gets generated (?)
