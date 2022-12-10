const dealHelper = require("../helper/dealWithJson.helper")
const dataHelper = require("../helper/data.helper")
class Book {

    static addBook = (req, res) => {
        res.render("addBook", { pageTitle: "add book" })
    }
    static addBookLogic = (req, res) => {
        const book = { id: Date.now(), ...req.body }
        const all = dealHelper.readFromJSON()
        all.push(book)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }

    static allBooks = (req, res) => {
        const books = dealHelper.readFromJSON()
        res.render("allBooks", {
            pageTitle: "All Books",
            books,
            hasBooks: books.length
        })
    }

    static editBook = (req, res) => {
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        res.render("edit", {
            pageTitle: "edit page",
            result: all[result]
        })
    }

    static editBookLogic = (req, res) => {
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        if (result == -1) return res.render("err404", { pageTitle: "invalid", err: "invalid id" })
        const newBook = { id: req.params.id, ...req.body }
        all[result] = newBook
        dealHelper.writeToJSON(all)
        res.redirect(`/single/${req.params.id}`)
    }

    static singleBook = (req, res) => {
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        res.render("single", {
            pageTitle: "single page",
            result: all[result]
        })
    }
    static delBook = (req, res) => {
        const all = dealHelper.readFromJSON()
        const BookIndex = dataHelper.getId(all, "id", req.params.id)
        if (BookIndex != -1) all.splice(BookIndex, 1)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }


    static sortByNumber = (req, res) => {
        const books = dealHelper.readFromJSON()
        const sortedBooks = books.sort((a, b) => a.pages - b.pages)
        res.render("sortedByNumber", {
            pageTitle: "sorted books",
            sortedBooks,
            hasBooks: books.length
        })
    }

    static sortByName = (req, res) => {
        const books = dealHelper.readFromJSON()
        const sortedBooks = books.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })

        res.render("sortedByName", {
            pageTitle: "sorted books",
            sortedBooks,
            hasBooks: books.length
        })
    }


    static search = (req, res) => {
        const all = dealHelper.readFromJSON()
        let name = req.body.name
        let result = all.filter(o => o.name.includes(name));
        res.render("searchResult", {
            pageTitle: "Books",
            result,
            hasBooks: result.length
        })

    }
}
module.exports = Book