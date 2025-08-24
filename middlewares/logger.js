import fs from "fs";
function logger(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,
      (err, data) => {
        if (err) console.error(err);
        next();
      }
    );
  };
}

export { logger };
