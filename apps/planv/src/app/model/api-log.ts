export interface ApiLog {
    id: number;
    userId: number;
    url: string;
    queryUrl?: string;
    timestamp: string;
}

export interface ApiLogAggregate {
    userName: string;
    url: string;
    count: number;
}
