const router = require("express").Router()
const bookControl = require("../controller/book.controller")

router.get("/", bookControl.allBooks)


router.get("/addBook", bookControl.addBook)
router.post("/addBookLogic", bookControl.addBookLogic)

router.get("/single/:id", bookControl.singleBook)

router.get("/del/:id", bookControl.delBook)

router.get("/edit/:id", bookControl.editBook)
router.post("/edit/:id", bookControl.editBookLogic)

router.get("/sortByNumber", bookControl.sortByNumber)
router.get("/sortByName", bookControl.sortByName)

router.get("/searchResult", bookControl.search)


module.exports = router