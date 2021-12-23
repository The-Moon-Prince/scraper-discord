const Glob = require("glob")
const fs = require("fs")
const Gradient = require("gradient-string")
const local = process.env.LOCALAPPDATA
const installedDiscord = []
const toCheck = []

var content = fs.readdirSync(local)
content.forEach(dirContent => {
    if (dirContent.includes("cord")) installedDiscord.push(`${local}\\${dirContent}`)
});

installedDiscord.forEach(r => {
    Glob.sync(`${r}/app-*/modules/discord_desktop_core-*/discord_desktop_core/index.js`).map(f => toCheck.push(f))
});

toCheck.forEach(r => {
    var fileContent = fs.readFileSync(r, 'utf-8')
    if (fileContent.includes("session")) {
        console.log(Gradient.instagram(`Vous avez été Grab dans \n${r.split("/")[5]}\nJe supprime le Grabber...`))
        fs.writeFileSync(r, "module.exports = require('./core.asar')")
        fs.readFile(r, 'utf-8', (err, data) => {
            if (data.toString() == "module.exports = require('./core.asar')") console.log(Gradient.retro(`Le Grabber a été supprimé avec succès \n${r.split("/")[5]}\nVeuillez changer votre mot de passe.`))
            else console.log(Gradient.fruit(`Le Grabber n'a pas pu être supprimé, réinstallez discord ${r.split("/")[5]}`))
        });
    } else console.log(Gradient.instagram(`${r.split("/")[5]} est Safe.`))
});
