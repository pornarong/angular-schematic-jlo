import { BaseModel } from 'src/app/shared/base.model';

export interface <%= classify(name) %> extends BaseModel {
<% for (let column of columnListJson.filter(c => !system_fields.includes(c.column_name.toLowerCase()))) { %>
  <%= camelize(column.column_name.toLowerCase()) %>?: <%= type_mapping[column.data_type] %>;
<% } %>
}

export interface Search<%= classify(name) %> {
<% for (let column of columnListJson.filter(c => c.is_searchable === 'Y')) { %>
  <%= camelize(column.column_name.toLowerCase()) %>?: <%= type_mapping[column.data_type] %>;
<% } %>
}