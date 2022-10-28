"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var import_access = require("@keystone-6/core/access");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true })
    },
    ui: {
      listView: {
        initialColumns: ["name", "posts"]
      }
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      status: (0, import_fields.select)({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" }
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control"
        }
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      publishDate: (0, import_fields.timestamp)(),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        }
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        },
        many: true
      })
    }
  }),
  Translation: (0, import_core.list)({
    fields: {
      language: (0, import_fields.select)({
        options: ["de", "en"],
        isIndexed: "unique"
      }),
      homeText: (0, import_fields.text)({
        validation: {
          isRequired: true
        }
      })
    },
    access: import_access.allowAll
  }),
  Tag: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields.text)(),
      posts: (0, import_fields.relationship)({ ref: "Post.tags", many: true })
    }
  })
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  if (false) {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var trpcExpress = __toESM(require("@trpc/server/adapters/express"));

// trpc/context.ts
async function createContextInner({ opts, keystoneCtx }) {
  return { opts, keystoneCtx };
}
async function createContextTrpc(opts, keystoneCtx) {
  return await createContextInner({ opts, keystoneCtx });
}

// trpc/trpc.ts
var import_superjson = __toESM(require("superjson"));
var import_server = require("@trpc/server");
var t = import_server.initTRPC.context().create({
  transformer: import_superjson.default,
  errorFormatter({ shape }) {
    return {
      ...shape,
      data: {
        ...shape.data
      }
    };
  }
});

// trpc/routes/translationRouter.ts
var translationRouter = t.router({
  translations: t.procedure.query(async ({ ctx }) => {
    const data = await ctx.keystoneCtx.prisma.translation.findMany({});
    return data;
  })
});

// trpc/routes/index.ts
var appRouter = t.router({
  translations: translationRouter
});

// keystone.ts
var import_cors = __toESM(require("cors"));
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    graphql: {},
    lists,
    session,
    server: {
      port: 4e3,
      extendExpressApp: (app, createContext) => {
        app.use((0, import_cors.default)());
        app.use(
          "/trpc",
          async (req, res, next) => {
            const keystoneCtx = await createContext(req, res);
            return trpcExpress.createExpressMiddleware({
              router: appRouter,
              createContext: () => createContextTrpc({ req, res }, keystoneCtx)
            })(req, res, next);
          }
        );
      }
    }
  })
);
