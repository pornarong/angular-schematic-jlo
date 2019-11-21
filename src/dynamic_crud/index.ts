import { Rule, SchematicContext, Tree, url, apply, template, mergeWith, move } from '@angular-devkit/schematics';

import { strings, normalize } from '@angular-devkit/core';
import { Schema } from './schema';
import { setupOptions } from './setup';
import { Config } from './config';
import * as fs from 'fs';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    var columnListStr = readFile(_options.tempFilePath);

    _options.columnListJson = JSON.parse(columnListStr);

    setupOptions(tree, _options);

    const movePath = (_options.flat) ?
      normalize(_options.path) :
      normalize(_options.path + '/' + strings.dasherize(_options.name));

    const sourceTemplates = url('./files');    

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        ...new Config("mysql")
      }),
      move(movePath)
    ])

    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}

function readFile(path: string) {
  var data = fs.readFileSync(path);
  return data.toString();
}