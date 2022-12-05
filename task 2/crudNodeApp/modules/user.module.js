heads = [
    { key: "id", default: Date.now() },
    { key: "name", default: null },
    { key: "age", default: null },
    { key: "email", default: null },
    { key: "status", default: false }
]
const deal = require("./deal.module")
class User {
    static add(data) {
        const user = {}
        heads.forEach(head => {
            if (head.default != null)
                user[head.key] = head.default
            else user[head.key] = data[head.key]
        });
        console.log(user)
        const all = deal.readFromJson()
        all.push(user)
        deal.writeToJson(all)
    }
    static showAll() {
        const all = deal.readFromJson()
        console.log(all)
    }
    static showSingle(id) {
        const all = deal.readFromJson()
        const oneUser = all.find(x => x.id = id);
        console.log(oneUser)
    }
    static edit(id, data) {
        const all = deal.readFromJson()
        const user = all.find(x => x.id = id);
        if (user) {
            user.name = data.name;
            user.email = data.email;
            user.status = data.status;
        } else {
            console.log("id not found")
        }
    }
    static del(id) {
        const all = deal.readFromJson()
        const userIndex = all.findIndex(x => x.id = id);

        if (userIndex == -1) {
            console.log("id not found")
        } else {
            all.splice(userIndex, 1)
            deal.writeToJson(all)
            console.log(all)
        }
    }
}
module.exports = User