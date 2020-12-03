const Discord = require('discord.js');
const client = new Discord.Client();
const env = require('dotenv').config()
const PREFIX = process.env.prefix;
let orga = new Array(3);
let orgaId = new Array(3);
let player = new Array(4);
let playerId = new Array(4);
let final = new Array(2);
let finalId = new Array(2);


function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention).id;
	}
}

function arraysMatch(userId) {
  let userIdArr = userId.split('')

  let res = false

  for (let playerIdx = 0; playerIdx < playerId.length; playerIdx++) {

    if (userId === playerId[playerIdx]) {
      res = true
      break
    } else if (userId !== playerId[playerIdx]) {
      res = false
    }
  }

  if (res === true) {
    return true
  } else
    return false
}

function arraysMatchOrga(userId) {
  let userIdArr = userId.split('')

  let res = false

  for (let orgaIdx = 0; orgaIdx < orgaId.length; orgaIdx++) {

    if (userId === orgaId[orgaIdx]) {
      res = true
      break
    } else if (userId !== orgaId[orgaIdx]) {
      res = false
    }
  }

  if (res === true) {
    return true
  } else
    return false
}

function base(msg)
{
  let hand = 0;
      msg.channel.send('--------- QPUC ---------').then((message) => {
        message.react("🔴")
        message.react("🟢")
        message.react("🔵")
        message.react("🟡")

      const filter = (reaction, user) => {
        return ['🔴', '🟢', '🔵', '🟡'].includes(reaction.emoji.name) && arraysMatch(user.id)
      };

      message.awaitReactions(filter, {max: 1})
	        .then((collected) => {
	        	const reaction = collected.first();
	        	if (reaction.emoji.name === '🔴') {
              message.channel.send(player[0] + ' à la main');
	        	} else if (reaction.emoji.name === '🟢') {
              message.channel.send(player[1] + ' à la main');
	        	} else if (reaction.emoji.name === '🔵') {
              message.channel.send(player[2] + ' à la main');
	        	} else if (reaction.emoji.name === '🟡') {
              message.channel.send(player[3] + ' à la main');
            }

            message.channel.send('Bonne Réponse ?').then((msgg) => {
              msgg.react('👍')
              msgg.react('👎')

              const filterG = (reactionG, user) => {
                return ['👍', '👎'].includes(reactionG.emoji.name) && arraysMatchOrga(user.id);
              };

              msgg.awaitReactions(filterG, {max: 1})
              .then((collecteD) => {
                const reactionG = collecteD.first();
                if (reactionG.emoji.name === '👍')
                  msg.channel.send('Fini !');
                if (reactionG.emoji.name === '👎')
                  base(msg);
              });
            })
	    })
	    .catch(collected => {
	  	  message.reply('Eror');
    });
  });
}

client.on("ready", () => {
    console.log("Wallah frère jsuis on");
    client.user.setActivity("QPUC - Bot");
})

client.on('message', (msg) => {
    var member = msg.guild.member(msg.author.id);
    const args = msg.content.split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if  (cmd === `${PREFIX}help`)
    {
      msg.channel.send('$orga -> @Orga1 @Orga2 @Orga3');
      msg.channel.send('$player -> @Player1 @Player2 @Player3 @Player4')
      msg.channel.send('$qpuc -> Send msg with 4 reactions link to Player, first to click speak');
    }
    if (cmd === `${PREFIX}orga` && member.roles.cache.some(role => role.name === 'Présentateur QPUC')){
        orga[0] = args[0];
        orga[1] = args[1];
        orga[2] = args[2];
        orgaId[0] = getUserFromMention(args[0]);
        orgaId[1] = getUserFromMention(args[1]);
        orgaId[2] = getUserFromMention(args[2]);
        if (orga[0] !== undefined && orga[1] === undefined)
          msg.channel.send('Organisateur -> ' + orga[0]);
        else if (orga[1] !== undefined && orga[2] === undefined)
          msg.channel.send('Organisateurs -> ' + orga[0] + ' et ' + orga[1]);
        else if (orga[2] !== undefined)
          msg.channel.send('Organisateurs -> ' + orga[0] + ', ' + orga[1] + ' et ' + orga[2]);
    }

    if (cmd === `${PREFIX}player` && member.roles.cache.some(role => role.name === 'Présentateur QPUC')){
      player[0] = args[0];
      player[1] = args[1];
      player[2] = args[2];
      player[3] = args[3];
      playerId[0] = getUserFromMention(args[0]);
      playerId[1] = getUserFromMention(args[1]);
      playerId[2] = getUserFromMention(args[2]);
      playerId[3] = getUserFromMention(args[3]);
			if (player[0] === undefined || player[1] === undefined || player[2] === undefined || player[3] === undefined)
				msg.channel.send('Veuillez indiquer 4 joueurs avant de lancer la partie');
			else
				msg.channel.send(player[0] + ' -> 🔴\n' + player[1] + ' -> 🟢\n' + player[2] + ' -> 🔵\n' + player[3] + ' -> 🟡');
    }

		if (cmd === `${PREFIX}final` && member.roles.cache.some(role => role.name === 'Présentateur QPUC')) {
			final[0] = args[0];
			final[1] = args[1];
			finalId[0] = getUserFromMention(args[0]);
			finalId[1] = getUserFromMention(args[1]);
			if (final[0] === undefined || final[1] === undefined)
				msg.channel.send('Veuillez indiquer 2 finalistes');
			else
				msg.channel.send('Finalistes : ' + final[0] + ' vs ' + final[1]);
		}

    if (cmd === `${PREFIX}qpuc1` ){
      base(msg);
    }

    if (cmd === `${PREFIX}qpuc2` && member.roles.cache.some(role => role.name === 'Présentateur QPUC')) {
      msg.channel.send('Début du Quatre à la suite')
      setTimeout(() => {
        if (orga[0] !== undefined && orga[1] === undefined)
          msg.channel.send('⚠️ STOP ' + orga[0] + ' ⚠️');
        else if (orga[1] !== undefined && orga[2] === undefined)
          msg.channel.send('⚠️ STOP ' + orga[0] + ' et ' + orga[1] + ' ⚠️');
        else if (orga[2] !== undefined)
          msg.channel.send('⚠️ STOP ' + orga[0] + ', ' + orga[1] + ' et ' + orga[2] + ' ⚠️');
        else
          msg.channel.send('Aucun organisateur ajouté !');
      }, 4*10000);
    }

		/*if (cmd === `${PREFIX}qpuc3` && member.roles.cache.some(role => role.name === 'Présentateur QPUC')) {
			const timerObj = setTimeout(() => {
				msg.channel.send('--------- QPUC ---------').then((message) => {
					 message.react("🔴")

				const filter = (reaction, user) => {
					 return ['🔴'].includes(reaction.emoji.name) && arraysMatch(user.id)
				};

				message.awaitReactions(filter, {max: 1})
						.then((collected) => {
							const reaction = collected.first();
							if (reaction.emoji.name === '🔴') {
								timerObj.unref();
								message.channel.send(player[0] + ' à la main');
							}

								message.channel.send('Bonne Réponse ?').then((msgg) => {
									msgg.react('👍')
									msgg.react('👎')

									const filterG = (reactionG, user) => {
										return ['👍', '👎'].includes(reactionG.emoji.name) && arraysMatchOrga(user.id);
									};

									msgg.awaitReactions(filterG, {max: 1})
									.then((collecteD) => {
										const reactionG = collecteD.first();
										if (reactionG.emoji.name === '👍')
											msg.channel.send('Fini !');
										if (reactionG.emoji.name === '👎')
											setImmediate(() => {
												timerObj.ref();
											});
									});
								})
							})
						})
			}, 4*10000);
		}*/
})


client.login(process.env.authkey);
