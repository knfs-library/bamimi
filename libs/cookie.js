
exports.parseCookies = (cookies) => {
    const list = {};
    if (!cookies) {return list;}

    cookies.split(";").forEach(function (cookie) {
        let [name, ...rest] = cookie.split("=");
        name = name?.trim();
        if (!name) {return;}
        const value = rest.join("=").trim();
        if (!value) {return;}
        list[name] = decodeURIComponent(value);
    });

    return list;
}

exports.getCookie = async (key, cookies) => {
    if (!cookies) {return false;}

    for (const cookie of cookies.split(";")) {
        let [name, ...rest] = cookie.split("=");
        name = name?.trim();
        if (!name) {return false;}

        const value = rest.join("=").trim();
        if (!value) {return false;}

        if (name === key) {
            return await value;
        }
    }
}