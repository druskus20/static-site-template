# Static Site Template

A static website template project using 11ty and Parcel so I can reuse it for my projects.

## TODO
- [ ] Try including the static content from root, without 11ty having to copy it to .tmp_eleventy. Instead parcel should just source it directly.
- [ ] Currently `/index.html` is needed for parcel to source the files. We should try removing that in the end url after parcel bundles the project.
- [ ] Make sure that PUBLIC_URL works when deploying on a server
- [ ] Instead of using {{ Content }} maybe use blocks includes https://stackoverflow.com/questions/35496514/nunjucks-blocks-defined-within-include-partial-file-ignored-by-extend
- [ ] Partials for footer / header etc
