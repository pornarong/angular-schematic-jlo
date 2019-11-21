export class Config {
    config_type_mapping: any = { 
        "mysql": {
            "char": "string" 
            , "varchar": "string" 
            , "text": "string" 
            , "int": "number" 
            , "bigint": "number" 
            , "datetime": "string" 
            , "date": "string" 
            , "decimal": "number" 
        }
    };

    system_fields: string[] = ["created_by", "created_date", "updated_by", "updated_date", "bu_id"];

    type: string;
    type_mapping: any;

    constructor(type: string) {
        this.type = type;
        this.type_mapping = this.config_type_mapping[this.type];
    }
}