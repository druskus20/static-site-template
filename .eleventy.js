const sass = require("sass");
const ts = require("typescript");

const eleventyTS = (config) => {
  config.addTemplateFormats("ts");

  config.addExtension("ts", {
    outputFileExtension: "js",
    compile: function(source) {
      return function() {
        let ret = ts.transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS
          }
        });

        return ret.outputText;
      };
    }
  });
};

const eleventySass = (config) => {
  config.addTemplateFormats("scss");

  config.addExtension("scss", {
    outputFileExtension: "css",
    compile: function (contents, inputPath) {
      let includePaths = [this.config.dir.includes];
      return (data) => {
        let ret = sass.renderSync({
          file: inputPath,
          includePaths,
          data: contents
        });
        return ret.css.toString("utf8");
      };
    }
  });
};


module.exports = function(config) {
  
  eleventyTS(config);
  eleventySass(config);


//  // Compile _styles/styles.scss into css/styles.css
//  config.addPlugin(eleventySass, {
//    sassIndexFile: "styles.scss",
//    sassLocation: path.normalize(path.join(__dirname, "_styles/")),
//    includePaths: ["** /*.{scss,sass}", 
//                   "!node_modules/ **"],
//    outDir: path.normalize(path.join(__dirname, ".tmp_eleventy/")),
//    outPath: "/css/",
//    outFileName: "styles.css",
//
//    // We add the watchTarget manually
//    watchSass: false,
//  });

  // Copy /static to /
  config.addPassthroughCopy({
    static: "/"
  });

  config.addWatchTarget("./_styles/");
  config.addWatchTarget("./_data/");
  config.addWatchTarget("./_static/");

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
