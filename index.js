const Discord = require("discord.js")
const client = new Discord.Client();
const mongoose = require("mongoose")

require('./conexion')

const Blacklist = require('./Schema/blacklist-schema')

////////////////////////////////////////////////////

client.on('ready', () => {
  console.log(`${client.user.id}\n${client.user.tag}`)
})

client.on('message', async message => {

const hershell = "665286705565270057";

const args = message.content.split(' ').slice(1)

if(message.content.startsWith("$blacklistadd")){
    if (message.author.id === hershell){
      const user = message.mentions.members.first();
      if(!user) return message.channel.send("No se especificó a ningun usuario.")
      const reason = args.slice(1).join(' ')
      if(!reason) return message.channel.send("Especifica la razón")

      const blacklist = new Blacklist({
        username: user.user.username,
        userId: user.id,
        reason: reason,
        reportedBy: message.author.username,
        reportedById: message.author.id
      });
      blacklist.save();
      message.channel.send(`**${user.user.username}** ha sido agregado a la blacklist.`)
    }
  }

  if(message.content === "$blacklist"){
    if (message.author.id === hershell){
      const list = await Blacklist.find();
      const bklist = list.map(usuario => `**User:** \`${usuario.username}\` | **Reason:** \`${usuario.reason}\` | **UserId:** \`${usuario.userId}\`\n**ReportedBy:** \`${usuario.reportedBy}\` | **ReportedById:** \`${usuario.reportedById}\``).join('\n\n') || "`No hay usuarios en la blacklist`"

      const embed = new Discord.MessageEmbed()

      .setTitle("Blacklist")
      .setDescription(bklist)

      message.channel.send(embed)
    }
  }

  if(message.content.startsWith("$blacklistremove")){
    if (message.author.id === hershell){
      if (args === "all") return( 
      await Blacklist.deleteMany().then(message.channel.send("Todos los usuarios de la blacklist fueron removidos."))
      );
    const user = message.mentions.members.first();
    if(!user) return message.channel.send("No se especificó ningun usuario.")
    await Blacklist.deleteMany({ userId: user.id })
    message.channel.send(`El usuario **${user.user.username}** fue removido de la blacklist.`)
    }
  }

})

client.login(process.env.TOKEN)
