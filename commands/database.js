const Discord = require("discord.js");
const pg = require('pg')


//pool.query("CREATE TABLE userxp (id INT, xp INT, lvl INT)", (err, res)=>{
// console.log(err,res)
//  pool.end()
// })


const pool = new pg.Pool({
  user: 'rzzdnmvcvbukfk',
  host: 'ec2-34-198-243-120.compute-1.amazonaws.com',
  database: 'd8109afqb7n9hf',
  password: '61a0b3cb10dace308474cb1da5a50cbb78642e040627827ec3cd3a73ea4fd493',
  port: 5432,
})
pool.connect()


module.exports = {
  name: "owo",
  description: "Pinging the bot",
  execute(client, message) {
var xd = 24;
var dx = 5;
var idx = message.author.id;
    
//pool.query('INSERT INTO userxp (id, xp, lvl) VALUES ($1, $2, $3)', [idx, xd, dx])

        pool.query("CREATE TABLE userxp (id SERIAL PRIMARY KEY, xp INT, lvl INT)", (err, res)=>{
       console.log(err,res)
       pool.end()
}) 
  
}
}