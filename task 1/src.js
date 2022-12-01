const heads = ["name", "age", "phone"]
const addUser = document.querySelector("#addUser")

const readDataFromStorage = (itemKey = "Users", resType = "json") => {
    let data = localStorage.getItem(itemKey)
    if (resType == "json") {
        try {
            data = JSON.parse(data) || []
        } catch (e) {
            data = []
        }
    }
    return data
}

const writeDataToStorage = (data, itemKey = "Users") => localStorage.setItem(itemKey, JSON.stringify(data))

if (addUser)
    addUser.addEventListener("submit", () => {
        const user = {}
        heads.forEach((h) => {
            user[h] = addUser.elements[h].value
        })
        user.status = "inactive"
        const data = readDataFromStorage()
        data.push(user)
        writeDataToStorage(data)
    })


const remove = (id) => {
    const data = readDataFromStorage()
    data.splice(id, 1)
    writeDataToStorage(data)
    location.reload()
}

const edit = (id) => {
    const data = readDataFromStorage()
    if (data[id].status == "inactive") {
        data[id].status = "active"
    } else {
        data[id].status = "inactive"
    }
    writeDataToStorage(data)
    location.reload()
}

if (userData) {
    const data = readDataFromStorage();
    if (data) {
        let row = `<tr> 
        <td>id</td>
        <td>name</td>
        <td>age</td>
        <td>phone</td>
        <td>status</td>
        </tr>`
        data.forEach((u, i) => {
            row += `<tr> 
            <td>${i+1}</td>
            <td>${u.name}</td>
            <td>${u.age}</td>
            <td>${u.phone}</td>
            <td>${u.status}</td>
            <td><button onclick="edit(${i})" >Edit Status<button></td>
            <td><button onclick="remove(${i})" >Remove<button></td>
            </tr>`
            document.getElementById("tableOfUsers").innerHTML = row

        })
    }
}