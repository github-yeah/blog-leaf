export type AnswerKey<T> = T extends ReadonlyArray<{ name: infer R }> ? R : never;
export type AnswerObject<T> = AnswerKey<T> extends string ? Partial<Record<AnswerKey<T>, any>> : never;