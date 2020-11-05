// scheme-model
const db = require('../data/db-config.js')

module.exports = {
    find(){
        return db('schemes')
    },
    findById(id){
    return db("schemes").where({ id }).first()
    },
    findSteps(id){
    return db("steps as st")
    .join('schemes as s', 'st.scheme_id', 's.id')
    .select('s.schemename as Scheme','st.StepNumber', 'st.Instructions')
    .where({ id })
    },
    async create(scheme) {
        const [id] = await db("schemes").insert(scheme)
        return db('users').where({ id }).first()
    },
    async update(id, changes) {
        const count = await db("schemes").where({ id }).update(changes)
        if (count) {
            return db('schemes').where({ id }).first()
        } else {
            return Promise.resolve(null)
            }
    },
    async delete(id) {
        const scheme = await db('schemes').where({ id }).first()
        if (!scheme) return Promise.resolve(null)
        await db("schemes").where({ id }).del()
        return Promise.resolve(user)
    }
}