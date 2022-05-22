const sass = require("sass");
const ts = require("typescript");
const posthtml = require("posthtml");
const urls = require("posthtml-urls");

module.exports = function(config) {
  config.addWatchTarget("./static/");

  config.addPassthroughCopy({
    static: "/"
  });

  addScssExtension(config);
  addTsExtension(config);
  addTransformScssLinks(config);
  addTransformTsLinks(config);
  addTransformIndexToHtmlLinks(config);

  config.addTemplateFormats(["md", "njk", "html"]);

  return {
    // templateFormats: ["md", "njk", "html"],
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

function addTransformScssLinks(config) {
  config.addTransform("transform-scsslinks", async function(contents) {
    if (this.outputPath.endsWith(".html")) {
      const plugin = urls({
        eachURL: url => {
          if (url.endsWith(".scss")) {
            return url.slice(0, -5) + ".css";
          }
          return url;
        }
      });
      const res = (
        await posthtml()
          .use(plugin)
          .process(contents)
      ).html;
      return res;
    }
    return contents; // no change done.
  });
}

function addTransformTsLinks(config) {
  config.addTransform("transform-tslinks", async function(contents) {
    if (this.outputPath.endsWith(".html")) {
      const plugin = urls({
        eachURL: url => {
          if (url.endsWith(".ts")) {
            return url.slice(0, -3) + ".js";
          }
          return url;
        }
      });
      const res = (
        await posthtml()
          .use(plugin)
          .process(contents)
      ).html;
      return res;
    }
    return contents; // no change done.
  });
}

function addTransformIndexToHtmlLinks(config) {
  config.addTransform("transform-htmllinks", async function(contents) {
    if (this.outputPath.endsWith(".html")) {
      // add "index.html" to links
      const plugin = urls({
        eachURL: url => {
          // if its a directory
          if (
            !(
              url
                .split("/")
                .pop()
                .indexOf(".") > -1
            )
          ) {
            if (url.charAt(url.length - 1) != "/") {
              return url + "/index.html";
            } else {
              return url + "index.html";
            }
          }
          return url;
        }
      });
      const res = (
        await posthtml()
          .use(plugin)
          .process(contents)
      ).html;
      return res;
    }
    return contents; // no change done.
  });
}

function addScssExtension(config) {
  config.addTemplateFormats("scss");
  config.addExtension("scss", {
    outputFileExtension: "css",
    //read: false,
    compile: function(contents, inputPath) {
      let loadPaths = ["_includes/styles"];
      return () => {
        let ret = sass.compile(inputPath, {
          loadPaths
        });
        return ret.css.toString("utf8");
      };
    },
    compileOptions: {
      permalink: function(contents, inputPath) {
        return data => {
          if (data.permalink) {
            throw new Error("Do not use permalink with .scss templates");
          }
          const permalink =
            data.page.filePathStem.replace("/_assets", "") +
            "." +
            data.page.outputFileExtension;
          return permalink;
        };
      }
    }
  });
}

function addTsExtension(config) {
  config.addTemplateFormats("ts");
  config.addExtension("ts", {
    outputFileExtension: "js",
    compile: function(source) {
      return () => {
        let ret = ts.transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS
          }
        });
        return ret.outputText;
      };
    },
    compileOptions: {
      permalink: function(contents, inputPath) {
        return data => {
          if (data.permalink) {
            throw new Error("Do not use permalink with .ts templates");
          }
          const permalink =
            data.page.filePathStem.replace("/_assets", "") +
            "." +
            data.page.outputFileExtension;
          return permalink;
        };
      }
    }
  });
}
