const fs = require("node:fs");
const { v4: uuidv4 } = require("uuid");

let FRONT_DEST;
if (process.env.NODE_ENV === "production") {
  FRONT_DEST = `${process.env.BACKEND_URL}/`;
} else {
  FRONT_DEST = `${process.env.BACKEND_URL}:${process.env.PORT}/`;
}

const post = (req, res) => {
  // extract file destination (backend location)
  const { destination } = req.file;
  const fileDestination = destination.slice(destination.search("uploads"));

  // give file unique name by pre-pending uuid (avoid file to be overwritten)
  const { filename, originalname } = req.file;
  const oldfileName = filename;
  const newfileName = `${uuidv4()}-${originalname}`;

  // rename file using fs.rename(oldPath, newPath, callback);
  fs.rename(
    `./public/${fileDestination}${oldfileName}`,
    `./public/${fileDestination}${newfileName}`,
    (err) => {
      if (err) throw err;
      res.json({
        url_file: `${FRONT_DEST}${fileDestination}${newfileName}`,
      });
    }
  );
};

// delete file (can be a thumbnail image file or a video file)
const remove = (req, res) => {
  const { thumbnail, url_video: videoUrl } = req.body;
  const fileUrl = thumbnail || videoUrl;

  const isUploadFolder = fileUrl.includes(FRONT_DEST);

  // file is not in public backend folder => do nothing
  if (!isUploadFolder) {
    res.status(200).json({
      message: "Private files (frontend/assets) cannot be deleted...",
    });
  } else {
    // retrieve file relative path in backend public folder...
    const fileName = `./public/uploads${req.url}/${fileUrl.replace(
      `${FRONT_DEST}uploads${req.url}/`,
      ""
    )}`;

    // ...then delete file
    fs.unlink(fileName, (err) => {
      if (err) throw err;
    });
    res.status(204).json({
      message: "Thumbnail file successfully deleted!",
    });
  }
};

module.exports = { post, remove };
