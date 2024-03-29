// markdown-it allows us to add plugins
function configMarkdownIt(md) {
  return require("markdown-it")({
    html: true
  }).use(require("markdown-it-attrs"));
}

module.exports = function (config) {
  config.setLibrary("md", configMarkdownIt());

  // Watch for changes to static files
  config.addWatchTarget("./static/");
  config.addPassthroughCopy({
    static: "/"
    // static: "./static"
  });

  // Add Scss and Typescript. Transform the links, just like parcel would
  // in order to make them work while developing.
  config.addPlugin(require("./_11ty/extensionScss.js"));
  config.addPlugin(require("./_11ty/extensionTs.js"));
  config.addPlugin(require("./_11ty/transformTsLinks.js"));
  config.addPlugin(require("./_11ty/transformScssLinks.js"));
  config.addPlugin(require("./_11ty/transformAppendIndexHtml.js"));

  config.addTemplateFormats(["md", "njk", "html"]);

  // Add all files with shortcodes from _includes/shortcodes
  const shortcode_files = require("fs").readdirSync("./_includes/shortcodes");
  for (const file of shortcode_files) {
    console.log("Adding shortcode: " + file);
    const shortcode = require("./_includes/shortcodes/" + file);
    if (shortcode.name && shortcode.function) {
      config.addShortcode(shortcode.name, shortcode.function);
    } else {
      console.log("Error: Shortcode " + file + " does not have a name or function");
    }
  }

  return {
    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",
    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "_site_eleventy",
      includes: "../_includes",
      data: "../_data"
    }
  };
};
