# Static Site Template

A static website template project using 11ty and Parcel so I can reuse it for my projects.

## Running

```
npm run build
npm run build-parcel
npm run serve
npm run serve-parcel
npm run clean
npm run fmt
```

## Design Choices:

```
_data/
_includes/  # Layouts, partials, macros and _scss files
static/     # Things that don't get templated. They get copied to /
src/        # Things that get templated
  _src/     # Contents of the website
  _assets/  # Scss and Ts. When generated, the _assets directory disappears and
            # the contents get copied to /
```

### `_assets`

Scss and Ts files are converted into CSS and js via 11ty Extensions. They also remove `_assets` from the
permalink, so the files get generated at `/` instead of `/_assets`.

### linking directly to scss and ts in your HTML

I have created two 11ty Transforms that change the extension of URLs containing `scss` and `ts` to
point to their CSS and js counterparts.

### local styles and scripts

Upon build, the contents of `_assets` will be compiled into `/`. This allows us to link to local styles per
post, with relative references.

Example:

```
_assets/posts/my-post/styles.scss
```

Will generate:

```
/posts/my-post/styles.css
```

Therefore, we can include it from my-post with:

```
<link rel="stylesheet" href="./styles.scss">
```

### index.html

Bundling with Parcel requires that `href`s to other pages end with `index.html`. For that, I have
created an 11ty Transform that inserts `index.html` at the end of the URLs that don't have it.

### Parcel

For the final build, we run Parcel over the website generated by 11ty. Even though the website works
by itself (so it is not necessary to run parcel while developing), it can still
be useful to run it before publishing to production, to minify the code and
optimize it.

For this, we need to tell Parcel to treat `_site_eleventy` as the root. Because
parcel does not allow us to do this through configuration, we need to trick it into thinking that
that is the root directory. For that reason, from package.json, we create a `_site_eleventy/.hg` file
before building.

### Possible alternatives

#### Merging \_assets and src

I decided not to go with this because otherwise, 11ty will recognize scss/ts
files as pages. Maybe there's a way to avoid that, I'd be interesting to look
into it, as it would probably be more intuitive.

#### Building parcel from `/` instead of `/_site_eleventy`

I considered it, but I didn't want to rely on Parcel to build my scss and ts. It
would also mean that the links to styles and scripts inside my HTML would need
to reference my project root, as otherwise, Parcel wouldn't find them. In
general, it generates too much confusion and it's likely to break your links.

## TODO

- Ideally, I would like to have \_assets at the same level as static. But since 11ty seems to need them inside the input directory for them to be processed.
- I would also like into how to make 11ty exclude scss and ts files from collections, as then I wouldn't need to separate them into `_assets`.
