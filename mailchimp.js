const mailchimp = require("@mailchimp/mailchimp_marketing");

// Allow usage of .env variables
require("dotenv").config();

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_SERVER,
});

async function subscribeUserToNewsletter(email, firstName, lastName)
{
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    });

    console.log(`Successfully added contact to Mailchimp audience!`);
}

module.exports = {
    subscribeUserToNewsletter
};