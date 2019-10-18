# Getting Started With JLO Schematics

This repository is a JLO Schematic implementation that serves as a starting point to create new angular page template.

### Add Dependency to angular project
```
"dependencies": {
  ...
  "@schematics/jlo": "github:pornarong/angular-schematic-jlo#1.0.3"
  ...
}
```

## Example

### Usage
```
ng g @schematics/jlo:crud pages/system/test
```

### Result
```
CREATE src/app/pages/system/test/test.component.html (6058 bytes)
CREATE src/app/pages/system/test/test.component.scss (0 bytes)
CREATE src/app/pages/system/test/test.component.ts (3293 bytes)
CREATE src/app/pages/system/test/test.model.ts (106 bytes)
CREATE src/app/pages/system/test/test.module.ts (508 bytes)
CREATE src/app/pages/system/test/test.service.ts (2167 bytes)
```
 
