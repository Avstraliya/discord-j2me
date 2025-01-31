const cp = require('child_process');
const targets = require('../build.json');

const compileScript = (process.platform == 'win32') ? "sdk\\compile.bat" : "sdk/compile.sh";
const classpathJoiner = (process.platform == 'win32') ? ";" : ":";

targets.forEach(target => {
  process.env.JAR_NAME = target.name;
  process.env.DEFINES = "-D" + target.defines.join(" -D");
  process.env.BOOTCLASSPATH = target.bootclasspath.join(classpathJoiner);
  process.env.EXCLUDES = (target.excludes || []).join(" ");
  
  console.log(`${"_".repeat(80)}\n`)
  console.log(` Compiling: ${target.name}`)
  console.log(`${"_".repeat(80)}\n`)
  try {
    console.log(cp.execSync(compileScript).toString());
  }
  catch (e) {
    console.log("Compilation failed");
    process.exit(1);
  }
})