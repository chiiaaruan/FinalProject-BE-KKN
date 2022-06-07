function checkError(handler) {
    return function (req, res, next) {
        handler(req, res).catch(next)
    };
}

function getIdParam(req) {
    const id = req.params.id;
    if (/^\d+$/.test(id)) {
        return Number.parseInt(id, 10);
    }
    throw new TypeError(`Invalid ':id' param: "${id}"`);
}

module.exports = { checkError, getIdParam };