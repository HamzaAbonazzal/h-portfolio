const skillController = require("./controllers/skillController");
const authMiddleware = require("./middleware/authMiddleware");

console.log("📦 skillController exports:", Object.keys(skillController));
console.log("🔑 authMiddleware exports:", Object.keys(authMiddleware));

console.log("getSkills is function?", typeof skillController.getSkills);
console.log("createSkill is function?", typeof skillController.createSkill);
console.log("updateSkill is function?", typeof skillController.updateSkill);
console.log("deleteSkill is function?", typeof skillController.deleteSkill);
console.log("protect is function?", typeof authMiddleware.protect);
console.log("adminOnly is function?", typeof authMiddleware.adminOnly);
