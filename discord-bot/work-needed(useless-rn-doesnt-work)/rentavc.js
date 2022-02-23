channel.permissionOverwrites.edit(user.id, { VIEW_CHANNEL: true });
// create channel in category of channel => JSON in custon-vcs in ServerFolder channelID & userID (Channel-Owner) 
// => need create rent-a-vc-setupChannel command => set category w/drag & drop :thumbsup:
// => join & leave listener create on join (store "create-vc-vc".id in JSON in Server-Folder)
// => on leave: if channel in JSON = empty => delete file & channel
// => set permissions on channel.create for Owner