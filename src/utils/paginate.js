const constant = require("../configs/constant")

function generatePage(page, size) {
    let limit = Number(size) ?? 20;
    limit = limit > constant.page.maxLimit ? constant.page.maxLimit : Number(limit);
    const offset = page ? (Number(page) - 1) * limit : 1;

    return { limit, offset };
};



module.exports = {
    generatePage,
};

