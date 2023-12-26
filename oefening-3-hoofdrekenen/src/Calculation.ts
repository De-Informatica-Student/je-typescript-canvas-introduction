import { Operation, Operator } from './Operation.js';

/**
 * Represents a calculation with two operands and an operation.
 */
export default class Calculation {
  /** The first operand. */
  private readonly operandA: number;

  /** The second operand. */
  private readonly operandB: number;

  /** The operation to be performed */
  private operation: Operation;

  /**
   * Creates a new instance of a calculation.
   *
   * @param operator The operator to be used for the operation.
   */
  public constructor(operator: string) {
    this.operandA = Calculation.getRandomOperand();
    this.operandB = Calculation.getRandomOperand();
    this.operation = new Operation(Calculation.getOperator(operator));
  }

  /**
   * Retrieves the operator based on the given string value.
   * Returns a random operator when the input is not a valid operator.
   *
   * @param operator The operator to retrieve.
   * @returns The retrieved operator.
   */
  private static getOperator(operator: string): Operator {
    const options: string[] = ['+', '-', '*', '/'];

    if (options.includes(operator)) {
      return operator as Operator;
    } else {
      const randomOperator: number = Math.round(Math.random() * (options.length - 1));
      return options[randomOperator] as Operator;
    }
  }

  /**
   * Generates a random number between 10 and 100.
   *
   * @returns A random operand.
   */
  private static getRandomOperand(): number {
    return Math.round(Math.random() * 90) + 10;
  }

  /**
   * Checks if the given answer is correct.
   *
   * @param answer The answer to check.
   * @returns True if the given answer is correct, otherwise false.
   */
  public checkAnswer(answer: number): boolean {
    const solution: number = this.operation.calculate(this.operandA, this.operandB);
    return solution === answer;
  }

  /**
   * Returns a string representation of the calculation.
   * For example: 23 + 65.
   *
   * @returns The string representation of the object.
   */
  public toString(): string {
    return `${this.operandA} ${this.operation.toString()} ${this.operandB}`;
  }
}
