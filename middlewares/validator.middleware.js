import BadRequest from "../error/error.js";
export function validator (schema, path='body') {
    return function (req, res, next) {
        let request = req.body;
        if (path === 'query') {
            request = req.query;
        } else if (path === 'params') {
            request = req.params;
        }
        const { value, error } = schema.validate(request);
        if (error) {
            throw new BadRequest(error.details[0].message);
        }


        req.dirty = req.body;
        req.body = value;

        next()
    }
}