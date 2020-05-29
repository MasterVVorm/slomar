import { Context, Next } from "koa";
import jsonwebtoken from "jsonwebtoken";
import { Connection } from "typeorm";
import { User } from "@entities";

export function createJwtMiddleware(connection: Connection) {
  return async (ctx: Context, next: Next) => {
    let token = ctx.request.header["authorization"] || "";

    let user = null;

    if (token) {
      token = token.split(" ")[1];
      let decoded = <any>jsonwebtoken.verify(token, process.env.JWT_SECRET);

      if (decoded.id) {
        const _user = await connection.manager.findOne(User, {
          id: decoded.id,
        });

        if (_user) {
          user = _user;
        }
      }
    }

    ctx.state = user;

    await next();
  };
}
