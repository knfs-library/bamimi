const constant = config("constant") //eslint-disable-line

exports.getPagination = async (page, size) => {
    let limit = Number(size) ?? 20;
    limit = limit > constant.page.max_limit ? constant.page.max_limit : Number(limit); 
    const offset = page ? (Number(page) - 1) * limit : 1;

    return await { limit, offset };
};

