/**
 * A class which holds data and methods for ScriptConnections.
 */
export interface ScriptConnection {
  /**
   * A boolean which determines if a ScriptConnection is active or not.
   * @readonly
   */
  readonly Connected: boolean;

  /**
   * Disconnects a connection, any `.Fire` calls from now on will not
   * invoke this connection's handler.
   *
   * ```ts
   * const connection = ScriptSignal.Connect(() => {})
   *
   * connection.Connected -> true
   * connection.Disconnect()
   * connection.Connected -> false
   * ```
   */
  Disconnect(): void;
}

interface ScriptSignal<T extends any[] = any[]> {
  readonly ClassName: "ScriptSignal";

  /*
   * Creates a ScriptSignal object.
   */
  new <T extends any[]>(): ScriptSignal<T>;

  /**
   * Returns a boolean determining if the object is a ScriptSignal.
   *
   * ```ts
   * const janitor = new Janitor()
   * const signal = new ScriptSignal()
   *
   * ScriptSignal.Is(signal) -> true
   * ScriptSignal.Is(janitor) -> false
   * ```
   */
  Is(object: any | object): boolean;

  /**
   * Returns a boolean which determines if a ScriptSignal object is active.
   *
   * ```ts
   * ScriptSignal.IsActive() -> true
   * ScriptSignal.Destroy()
   * ScriptSignal.IsActive() -> false
   * ```
   */
  IsActive(): boolean;

  /**
   * Connects a handler to a ScriptSignal object.
   *
   * ```ts
   * ScriptSignal.Connect((text) => {
   *     print(text)
   * })
   *
   * ScriptSignal.Fire("Something")
   * ScriptSignal.Fire("Something else")
   *
   * // Output: "Something" and then "Something else" are printed
   * ```
   */
  Connect(heandler: (...any: T) => void): ScriptConnection;

  /**
   * Connects a handler to a ScriptSignal object, but only allows that
   * conneciton to run once. Any `.Fire` calls called afterwards won't trigger anything.
   *
   * ```ts
   * ScriptSignal.Once(() => {
   *     print("Conneciton fired")
   * })
   *
   * ScriptSignal.Fire()
   * ScriptSignal.Fire()
   *
   * // Output: "Connection fired" is only fired once
   * ```
   */
  Once(handler: (...any: T) => void): ScriptConnection;

  /**
   * Yields the thread until a `.Fire` call occurs, returns what the signal was fired with.
   *
   * ```ts
   * task.spawn(() => {
   *     print(ScriptSignal.Wait())
   * })
   *
   * ScriptSignal.Fire("Arg", undefined, 1, 2, 3, undefined)
   *
   * // Output: "Arg", nil, 1, 2, 3, nil are printed
   * ```
   */
  Wait(): LuaTuple<T>;

  /**
   * Fires a ScriptSignal object with the arguments passed.
   *
   * ```ts
   * ScriptSignal.Connect((text) => {
   *     print(text)
   * })
   *
   * ScriptSignal.Fire("Some Text...")
   * ScriptSignal.Fire("Some Text...")
   *
   * // Output: "Some Text..." is printed twice
   */
  Fire(...any: T): void;

  /**
   * Disconnects all connections from a ScriptSignal object without making it unusable.
   *
   * ```ts
   * const connection = ScriptSignal.Connect(() => {})
   *
   * conneciton.Connected -> true
   * ScriptSignal.DisconnectAll()
   * conneciton.Connected -> false
   * ```
   */
  DisconnectAll(): void;

  /**
   * Destroys a ScriptSignal object, disconnecting all connections and making it unusable.
   *
   * ```ts
   * ScriptSignal.Destroy()
   *
   * const connection = ScriptSignal.Connect(() = {})
   * connection.Connected -> false
   * ```
   */
  Destroy(): void;
}

/**
 * A class which holds data and methods for ScriptSignals.
 */
export declare const FastSignal: ScriptSignal;
