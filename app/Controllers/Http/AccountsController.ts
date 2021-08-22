// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Account from "App/Models/Account";

export default class AccountsController {

    public async storeAccount(ctx) {
        try {
            let data = ctx.request.all()
            let account = await Account.create({ type: data.type, date: data.date, amount: data.amount, user_id: data.user_id });

            return ctx.response.status(200).send(account);
        } catch (error) {
            return ctx.response.status(422).send({ message: error.message });
        }
    }

    public async fetchUserAccounts(ctx) {
        try {
            let user = await ctx.auth.use('web').authenticate()
            let userId = user.id

            let accounts = await Account.query().where('user_id', userId)

            console.log(accounts)
            return ctx.response.status(200).send(accounts);
        } catch (error) {
            return ctx.response.status(422).send({ message: error.message });
        }
    }
}
