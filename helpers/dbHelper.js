const { sequelize, Sequelize } = require("../config/sequelize.js");

module.exports.getDetails = async (email,name) =>{
    try{
    let user_exists = await sequelize.query(`select * from smtp where from_name = "${name}" and from_email = "${email}"`,
            { type: Sequelize.QueryTypes.SELECT });
            return user_exists;
    }catch(e){
        console.log(e);
        throw e;
    }
}

module.exports.registerUser = async (details) => {
    try{
       let register = await sequelize.query(`insert into smtp (from_name,from_email,user_name,password,smtp_host,smtp_port,certificate,per_day_messages,time_gap,different_email_to_reply,different_email_to_receive,imap_host,imap_port,imap_certificate) values ('${details.from_name}','${details.from_email}','${details.user_name}','${details.password}','${details.smtp_host}','${details.smtp_port}','${details.certificate}','${details.per_day_messages}','${details.time_gap}','${details.different_email_to_reply}','${details.different_email_to_receive}','${details.imap_host}','${details.imap_port}','${details.imap_certificate}');`, { type: Sequelize.QueryTypes.INSERT });
    }catch (e){
        console.log(e);
        throw e;
    }
}

module.exports.emailDetails = async (deatils) => {
    try {
        let email_details = await sequelize.query(`insert into emails (to_email,cc,bcc,subject,body) values ('${deatils.to ? deatils.to : ""}','${deatils.cc ? deatils.cc: ""}','${deatils.bcc ? deatils.bcc : ""}','${deatils.subject ? deatils.subject : ""}','${deatils.body ? deatils.body : ""}')`,{type: Sequelize.QueryTypes.INSERT, logging: true});
    }catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports.getFromEmail = async(id) => {
    try {
        let email = await sequelize.query(`select from_email from smtp where id=${id}`);
        return email.from_email;
    }catch (e){
        console.log(e);
        throw e;
    }
}