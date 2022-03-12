// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class LoginController {
  public async store({ request, response }) {
    const email = request.input("email");
    const password = request.input("password");

    if (!email || !password) {
      return response.status(400).json({ msg: "invalid credential" });
    }
    if (password.length < 4) {
      return response
        .status(400)
        .json({ msg: "Password must be 4 digit long" });
    }

    const user: any = await User.find(email);
    if (!user) {
      return response.status(400).json({ msg: "This Email is Not Exists" });
    }

    const matchPass = await Hash.verify(user.password, password);
    if (!matchPass) {
      return response.status(400).json({ msg: "Password Not Matched" });
    }

    return response.ok(user);
  }
}
