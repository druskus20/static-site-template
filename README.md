# Static Site Template

A static website template project using 11ty and Parcel so I can reuse it for my projects.

## TODO
- [ ] More consistent naming scheme for directories
- [ ] Try including the static content from root, without 11ty having to copy it to .tmp_eleventy. Instead parcel should just source it directly.
  - this would mean, I would now run parcel from the root, not having to rely on hacky .hg and .parcelrc copy's
  - might be able to remove the `static` watchtarget for 11ty, since parcel would do everything there.
- [ ] might want to just do everything from 11ty since I would also like to compile the shortcodes/filters from ts to js
  - This would mean that my ts and scss cant be directly linked 
  - Might just use 11ty's global data then, and set the paths there  
  - Setting custom handlers for ts / scss might be the thing https://github.com/11ty/eleventy/issues/117
  - Might also want to inline css? Probably not.. is cached anyway, so this would just increase the page size
- [ ] Currently `/index.html` is needed for parcel to source the files. We should try removing that in the end url after parcel bundles the project.
- [ ] Make sure that PUBLIC_URL works when deploying on a server
- [ ] Instead of using {{ Content }} maybe use blocks includes https://stackoverflow.com/questions/35496514/nunjucks-blocks-defined-within-include-partial-file-ignored-by-extend
- [ ] Partials for footer / header etc
