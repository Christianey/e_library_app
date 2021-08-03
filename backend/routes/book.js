const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Book = require("../models/book");
require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);
const multer = require("multer");
const { verifyJWT } = require("../lib/verifyJWT");
const User = require("../models/user");

const storage = multer.diskStorage({});

let upload = multer({
  storage,
});

router.post("/book/upload", verifyJWT, upload.single("file"), fileUpload);
router.get("/books", listBooks);
router.get("/books/:username", verifyJWT, getUserBooks);
router.get("/book/search", searchBooks);

function before(req, res, next) {
  debug("This thing dey work before");
  next();
}

function after(req, res, next) {
  debug("This thing dey work after");
  next();
}

async function searchBooks(req, res, next) {
  const query = req.query.search;

  debug(query);

  const books = await Book.find({ title: { $regex: query, $options: "i" } });

  res.send(books);
}

async function fileUpload(req, res, next) {
  if (!req.user)
    return res.status(403).json("You are not permitted to view this resource");

  const user = await User.findById(req.user.id);

  if (!user)
    return res.status(401).json("You are not authorized to view this resource");

  user;
  try {
    if (!req.file)
      res
        .status(400)
        .json({ message: "File missing. Make sure it is being sent." });

    const { title, author, faculty, department, tags } = req.body;

    const { id } = req.user;

    debug(user);
    try {
      const uploadedFile = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "e_library",
        })
        .catch((error) => debug(error));

      const { originalname } = req.file;
      const { secure_url, bytes, pages } = uploadedFile;

      const newTitle = title || originalname;

      const book = new Book({
        title: newTitle,
        size: bytes,
        url: secure_url,
        postedBy: user.id,
        faculty,
        author,
        department,
        pages,
        tags,
      });

      debug("uploaded file: ", uploadedFile);
      debug("Request file: ", req.file);
      debug("Book", book);

      const newBook = await book
        .save()
        .catch((error) => res.status(400).json({ message: error }));

      await User.findByIdAndUpdate(id, { $addToSet: { uploadedBooks: book } });

      res.send(newBook);
    } catch (error) {
      res.status(401).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error. :(" });
  }
}

async function getUserBooks(req, res, next) {
  try {
    if (!req.user)
      return res
        .status(403)
        .json("You are not permitted to view this resource");

    const { id, username } = req.user;
    const { username: usernameParams } = req.params;

    if (username !== usernameParams)
      return res
        .status(403)
        .json("You are not permitted to view this resource");

    const user = await User.findById(id).populate("uploadedBooks");
    debug(user);

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function listBooks(req, res) {
  // const books = await Book.find();
  // .populate({ path: "postedBy", select: { hash: 0, salt: 0, __v: 0 } });
  // const uniqueBooks = books.reduce(( (acc, book) => {
  //   if(!Object.keys(acc).length) acc = {...book}
  //   if(book.title == acc.title) {
  //     acc={...acc, book}
  //   }
  //   return acc
  // }), {})

  const books = await Book.find().populate(
    "postedBy",
    "-salt -hash -uploadedBooks"
  );
  res.json(books);

  debug(books);
  // res.json(books)
}

module.exports = router;
