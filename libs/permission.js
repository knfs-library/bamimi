const permissions = config("permissions") //eslint-disable-line

/**
 * @param {Array<Number | "*">} ids
 * @returns {Array<{id: number, name: string, description: string, method: string, resource: string}> | false} 
 */
exports.checkPermissionByIds = async (ids) => {
    if (ids.length === 1 && ids[0] === "*") {
		return await permissions //eslint-disable-line
    }

    const result = []
    for (const id of ids) {
        for (const permission of permissions) { 
            if (permission.id === id) {
                await result.push(permission)
            }
        }
    }

    if (result.length !== ids.length) { 
        return false
    }

    return await result
}