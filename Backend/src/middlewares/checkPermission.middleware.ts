// import { NewRequest } from "./verify.middleware";
// import { Request, Response, NextFunction } from "express";
// import { Module, Role, Permission } from "../models";

// export const permissionauth = (
//   roles: string[],
//   action: string,
//   module?: string
// ) => {
//   return async (req: NewRequest, res: Response, next: NextFunction) => {
//     try {
//       let roleId;
//       const modules = await Module.findOne({ name: module });
//       if (!modules) {
//         return res.status(404).json({ message: "Module not found" });
//       }
//       const moduleId = modules._id;
//       const role = req.user.role;
//       if (roles.includes(role)) {
//         const roledata = await Role.findOne({ role });
//         roleId = roledata?._id;
//       } else {
//         return res
//           .status(403)
//           .json({ message: "Permission denied for this role", status: false });
//       }
//       const data: any = {
//         moduleId: moduleId,
//         roleId: roleId,
//       };
//       data[`${action}`] = true;
//       // console.log(data);
//       const permission: any = await Permission.findOne(data);
//       // console.log(permission);
//       if (!permission) {
//         return res
//           .status(400)
//           .json({ message: "Invalid action specified", status: false });
//       }
//       next();
//     } catch (error: any) {
//       res
//         .status(403)
//         .json({ message: "Permission for your role is not defined" });
//     }
//   };
// };
