function getColumns(sql) {
    try {
        return sql.replace(/\s*\n\s*/g, '')// remove \n
            .replace(/\s*\(\s*/g, '(')// remove spaces around (
            .replace(/\s*\)\s*/g, ')')// remove spaces around )
            .replace(/\s*;?\s*$/, '')// remove trailing ;
            .match(/^[^(]+\(([\s\S]+)\)$/)[1]// match parameters
            .split(',')// split columns
            .map(section => section.split(/\s+/).slice(0, 2));// get first two sections
    } catch (e) {
        console.warn('unrecognized sql', e);
        return [];
    }
}

module.exports = { getColumns };
