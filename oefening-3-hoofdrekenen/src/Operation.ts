/**
 * Represents a mathematical operator, can be one of the following: '+', '-', '*', '/'
 */
export type Operator = '+' | '-' | '*' | '/';

/**
 * Represents an operation that performs a mathematical operation on two operands.
 */
export class Operation {
  /** Represents an operator. */
  private readonly operator: Operator;

  /** Represents a collection of mathematical operators and their corresponding functions. */
  private static OPERATIONS: Record<Operator, (a: number, b: number) => number> = {
    '+': (a: number, b: number): number => a + b,
    '-': (a: number, b: number): number => a - b,
    '*': (a: number, b: number): number => a * b,
    '/': (a: number, b: number): number => Math.floor(a / b)
  };

  /**
   * Creates a new instance of the constructor.
   *
   * @param operator The operator to use.
   */
  public constructor(operator: Operator) {
    this.operator = operator;
  }

  /**
   * Calculates the result of the operation between given two operands.
   *
   * @param operandA The first operand.
   * @param operandB The second operand.
   * @returns The result of the operation.
   */
  public calculate(operandA: number, operandB: number): number {
    return Operation.OPERATIONS[this.operator](operandA, operandB);
  }

  /**
   * Returns the string representation of the operator.
   * This can be one of the following: '+', '-', '*', '/'.
   *
   * @returns The string representation of the object.
   */
  public toString(): string {
    return this.operator;
  }
}
