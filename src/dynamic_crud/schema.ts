export interface Schema {
    name: string;
    path: string;
    flat: string;

    tempFilePath: string;
    columnListJson: ColumnMetedata[];
}

export interface ColumnMetedata {
    column_name: string;
    column_type: string;
	data_type: string;
	max_length: string;
    numeric_precision: string;
	is_nullable: string;
	is_identity: string;
	is_primary_key: string;
	is_searchable: string;
	is_sortable: string;
}