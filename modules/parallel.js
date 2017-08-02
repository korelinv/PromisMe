function parallel(methods) {
    return (scope) => {

        let query = Array.isArray(methods) ? methods : [methods];

        return Promise.all(query.map((description) => description(scope)));
    };
};

module.exports = {parallel};
