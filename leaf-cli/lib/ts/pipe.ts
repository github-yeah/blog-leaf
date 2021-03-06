/**
 * @description 管道
 * @author xfy
 * @export
 * @interface Pipe
 */
export interface Pipe {
    /**
     * @description 管道
     * @template T
     * @param {T} destination
     * @returns {T}
     */
    pipe<T extends Pipe>(destination: T): T;
}