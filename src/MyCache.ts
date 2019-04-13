

export interface MyCache {

    get(id : string): Promise<string>;

    set(id: string, value: string): Promise<boolean>;

    remove(id: string) : Promise<boolean>;

    clear() : Promise<boolean>;
}