export class UsedCountRM {

  operation: number; // enum
  from: number;
  to: number;

  getModel() {
    return {
      operationEnumValue: this.operation,
      valueFrom: this.from,
      valueTo: this.to,
    };
  }

}
