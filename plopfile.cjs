module.exports = async (plop) => {
  /**
   * Compound pattern Root Component generator
   */
  plop.setGenerator("compound.root", {
    description: "Generate a new compound pattern root component in FSD.",
    prompts: [
      {
        type: "list",
        name: "layer",
        message: "Select Layer of Feature-Sliced Design.",
        choices: ["features", "entities", "shared", "widgets"],
      },
      {
        type: "input",
        name: "name",
        message: "Enter the root name in kebab-case for the compound pattern.",
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/{{layer}}/{{dashCase name}}/index.tsx",
        templateFile: "plop-templates/compound.root.hbs",
      },
      {
        type: "add",
        path: "app/{{layer}}/{{dashCase name}}/index.stories.tsx",
        templateFile: "plop-templates/compound.root.stories.hbs",
      },
      {
        type: "add",
        path: "app/{{layer}}/{{dashCase name}}/index.test.tsx",
        templateFile: "plop-templates/compound.root.test.hbs",
      },
    ],
  })

  /**
   * Compound pattern Child Component generator
   */
  plop.setGenerator("compound.child", {
    description: "Generate a new compound pattern child component in FSD.",
    prompts: [
      {
        type: "list",
        name: "layer",
        message: "Select Layer of Feature-Sliced Design.",
        choices: ["features", "entities", "shared", "widgets"],
      },
      {
        type: "input",
        name: "rootName",
        message: "Enter the root name in kebab-case for the compound pattern.",
      },
      {
        type: "input",
        name: "childName",
        message: "Enter the child name in kebab-case for the compound pattern.",
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/{{layer}}/{{kebabCase rootName}}/ui/{{pascalCase childName}}.tsx",
        templateFile: "plop-templates/compound.child.hbs",
      },
      {
        type: "add",
        path: "app/{{layer}}/{{kebabCase rootName}}/ui/{{pascalCase childName}}.stories.tsx",
        templateFile: "plop-templates/compound.child.stories.hbs",
      },
      {
        type: "add",
        path: "app/{{layer}}/{{kebabCase rootName}}/ui/{{pascalCase childName}}.test.tsx",
        templateFile: "plop-templates/compound.child.test.hbs",
      },
    ],
  })
}
