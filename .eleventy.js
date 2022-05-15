module.exports = function(config) {
  config.addWatchTarget("./static/scss/");
  // Copy /static to /
  config.addPassthroughCopy({
    static: "/"
  });
  return {
    templateFormats: ["md", "njk", "html"],
    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      output: ".tmp_eleventy",
      includes: "../_includes",
      data: "../_data"
    }
  };
};
