// verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor)
//verifyRoles(5150, 1984)

// req?.roles gives the roles that have permission to perform the requested operations like create, update, delete
// like createNewEmployee in .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)

// const reqRoles = [2001, 1984, 5150];
//     const rolesArray = [1984, 5150];
//     const result = reqRoles
//       .map((role) => rolesArray.includes(role))
//       .find((val) => val === true);
//     console.log(result);

// if !result, verifyRoles() is terminated and .post() is stopped without executing employeesController.createNewEmployee
//  if result is true, next() in verifyRoles is executed and employeesController.createNewEmployee is executed

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
