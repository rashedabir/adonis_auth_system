// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class RegistersController {
  public async store({ request, response }) {
    const name = request.input("name");
    const email = request.input("email");
    const password = request.input("password");

    if (!name || !email || !password) {
      return response.status(400).json({ msg: "invalid credential" });
    }
    if (password.length < 4) {
      return response
        .status(400)
        .json({ msg: "Password must be 4 digit long" });
    }

    const existingMail: any = await User.find(email);
    if (existingMail) {
      return response.status(400).json({ msg: "This Email is Already Exists" });
    }

    const payload = {
      name: name,
      email: email,
      password: await Hash.make(password),
    };

    const newUser: User = await User.create(payload);

    return response.ok(newUser);
  }
}
