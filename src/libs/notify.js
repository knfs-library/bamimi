const NotificationModel = require("./../app/models/Notification")
const Notification = NotificationModel.instance //eslint-disable-line

const formatters = {
    "content": "",
    "type": ""
}

const assignTaskNotify = async (task) => {
    console.info("format notification assignTaskNotify")
    const msg = { ...formatters }
    msg.content = task
    msg.type = "user_be_assigned_to_task"

    return msg
}

const unassignTaskNotify = async (task) => {
    console.info("format notification unassignTaskNotify")
    const msg = { ...formatters }
    msg.content = task
    msg.type = "user_be_unassigned_to_task"

    return msg
}

const updatePermissionsNotify = async (permission) => {
    console.info("format notification updatePermissionsNotify")
    const msg = { ...formatters }
    msg.content = permission
    msg.type = "user_be_updated_permissions"

    return msg
}

const updateRoleNotify = async (role) => {
    console.info("format notification updateRoleNotify")
    const msg = { ...formatters }
    msg.content = role
    msg.type = "user_be_updated_role"

    return msg
}

const notificationTypes = {
    assignTaskNotify,
    unassignTaskNotify,
    updatePermissionsNotify,
    updateRoleNotify
}

/**
 * 
 * @param {{type: string, content: any, receiver: User|null}} notification 
 */
module.exports = async ({ type, content, receiver = null}) => {
    const nt = await Object.keys(notificationTypes)
    if (!nt.includes(type)) {
        throw new Error("Notification type is not exist");
    }

    const msg = await notificationTypes[type](content)
    console.info("format add notification")
    await Notification.create({
        receiver_id: receiver.id,
        "message": JSON.stringify(msg),
        status: NotificationModel.NOT_SEEN_STATUS
    })
}